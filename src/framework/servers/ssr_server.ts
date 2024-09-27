import express from "express";
import path from "path";
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

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client_out")));

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
      const [injectionStream, renderStream] = rscResponse.body.tee();
      const serverRoot = await createFromNodeStream(
        // Need to cast from UInt8Array to any for some reason
        Readable.fromWeb(renderStream as ReadableStream<any>),
        getSSRManifest(),
      );
      const htmlStream = await renderToReadableStream(serverRoot);
      const reader = injectionStream.getReader();
      const transformedHtmlStream = new webStream.TransformStream({
        transform(chunk, controller) {
          let chunkValue = decodeText(chunk);
          if (chunkValue == "</body></html>") {
            chunkValue =
              `<script>self.env = ${JSON.stringify(client_env)}</script>\
              <script async type="module" src="/client_root.js"></script>\
              <script src="/reload.js"></script>`.concat(chunkValue);
            controller.enqueue(encodeText(chunkValue));
            controller.terminate();
          } else {
            controller.enqueue(encodeText(chunkValue));

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
