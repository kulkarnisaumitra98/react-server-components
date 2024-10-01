import express from "express";
import { Readable } from "stream";
import webStream from "node:stream/web";
import type { ReadableStream } from "node:stream/web";
// @ts-ignore
import { createFromNodeStream } from "react-server-dom-webpack/client.node.unbundled";
// @ts-ignore
import { renderToReadableStream } from "react-dom/server.edge";
import { decodeText, encodeText, getSSRManifest } from "./utils.js";
import { RSC_URL, WS_URL } from "../../shared/constants.js";

const client_env = {
  RSC_URL,
  WS_URL,
};
const app = express();

app.use(express.static("public"));
app.use(express.static("client_out"));

/* SSR server is only responsible for the initial loading/reloading of page

 On the SSR server our aim is as follows:-
  1.  Recieve the request from browser.
  2.  Forward that request to RSC server and get the 
      RSC payload by rendering the component for the particular path.
  3.  Make 2 copies of the RSC payload stream
  4.  Use the first copy to attach to window object which 
      will be used for hydration on the client.
  5.  Use the second copy to render HTML for SSR
  6.  Transform the HTML stream to attach the rsc payload 
      from step 4
      
*/
app.get("*", async (req, res) => {
  try {
    const pagePath = req.path;
    const params = req.query;

    const url = new URL(`${RSC_URL}/rsc${pagePath}`);

    const paramValues = Object.entries(params);

    if (paramValues.length) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, (value || "").toString());
      });
    }

    // Fetch rsc payload from rsc server
    const rscResponse = await fetch(url);

    if (rscResponse.status === 404) {
      res.send("Not found");
    } else if (rscResponse && rscResponse.body) {
      /* Copy the rsc stream as we should use the same response for 
         SSR and hydration
      */
      const [injectionStream, renderStream] = rscResponse.body.tee();
      /* As renderToReadableStream expects component for streaming HTML 
         component rsc stream to component first.
      */
      const serverRoot = await createFromNodeStream(
        Readable.fromWeb(renderStream as ReadableStream),
        getSSRManifest(),
      );
      const htmlStream = await renderToReadableStream(serverRoot);

      const reader = injectionStream.getReader();
      let envAdded = false;

      /* The main aim of transforming this stream is to attach RSC payloads
         (fetched from rsc server) to the window object, which then will be
         used for hydration on the client.
      */
      const transformedHtmlStream = new webStream.TransformStream({
        transform(chunk, controller) {
          let chunkValue = decodeText(chunk);
          if (chunkValue == "</body></html>") {
            controller.enqueue(encodeText(chunkValue));
            controller.terminate();
          } else {
            if (!envAdded) {
              envAdded = true;
              // Enviornment variables
              chunkValue += `<script>self.env = ${JSON.stringify(client_env)}</script>\
              <script src="/reload.js"></script>`;
            }
            controller.enqueue(encodeText(chunkValue));
            // https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams#reading_the_stream
            reader.read().then(function pump({
              value,
              done,
            }: webStream.ReadableStreamReadResult<any>):
              | Promise<void>
              | undefined {
              if (done) {
                return;
              }

              const serializablePayload = decodeText(value);
              controller.enqueue(
                `<script>(self.__RSC_PAYLOAD__ ||=[]).push(${JSON.stringify(serializablePayload)})</script>`,
              );
              return reader.read().then(pump);
            });
          }
        },
      });
      const injectedeHtmlStream = htmlStream.pipeThrough(transformedHtmlStream);
      Readable.fromWeb(injectedeHtmlStream).pipe(res);
    } else {
      res.send("Failed");
    }
  } catch (error) {
    console.log(error);
    res.send("Failed");
  }
});
// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running`);
});
