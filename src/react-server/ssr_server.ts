import express from "express";
import path from "path";
import { Readable } from "stream";
import webStream from "node:stream/web";
// @ts-ignore
import { createFromNodeStream } from "react-server-dom-webpack/client.node.unbundled";
// @ts-ignore
import { renderToReadableStream } from "react-dom/server.edge";
import { decodeText, encodeText, getSSRManifest } from "./utils.js";

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "dist", "client.js")));
app.use(express.static(path.join(__dirname, "public")));

app.get("*", async (req, res) => {
  try {
    const pagePath = req.path;
    // Fetch rsc payload from rsc server
    const rscPayload = await fetch(
      `http://localhost:3001/rsc?pagePath=${pagePath}`,
    );
    if (rscPayload && rscPayload.body) {
      const [injectionStream, renderStream] = rscPayload.body.tee();
      const reader = injectionStream.getReader();
      let serializablePayload: string | undefined;
      reader.read().then(function pump({
        value,
        done,
      }: webStream.ReadableStreamReadResult<any>): Promise<void> | undefined {
        if (done) {
          return;
        }

        serializablePayload = decodeText(value);
        return reader.read().then(pump);
      });
      const serverRoot = await createFromNodeStream(
        Readable.fromWeb(renderStream),
        getSSRManifest(),
      );
      const htmlStream = await renderToReadableStream(serverRoot);
      const transformedHtmlStream = new webStream.TransformStream({
        transform(chunk, controller) {
          let chunkValue = decodeText(chunk);
          if (chunkValue == "</body></html>") {
            controller.enqueue(chunkValue);
            controller.terminate();
          }

          chunkValue += `<script>(self.__RSC_PAYLOAD__ ||=[]).push(\`${serializablePayload}\`)</script>`;
          controller.enqueue(encodeText(chunkValue));
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
  console.log(`Server is running on http://localhost:${PORT}`);
});
