import express from "express";
import path from "path";
// @ts-ignore
import * as ReactServerDOM from "react-server-dom-webpack/server.edge";
import { createElement } from "react";
import cors from "./cors.js";
import { decodeText, getClientManifest } from "./utils.js";
import { getRoute, Paths } from "./server_router.js";
import { Readable } from "stream";
import { ServerRoot } from "./ServerRoot.js";

// Creating an Express application
const app = express();

// Serving static files from the 'public' folder
const __dirname = path.resolve();

app.use(cors);

app.use(express.static(path.join(__dirname, "dist")));

app.get("/rsc", async (req, res) => {
  const pathPath = req.query.pagePath as Paths;
  const Component = await getRoute(pathPath);
  const PageToRender = createElement(Component);
  const clientManifest = getClientManifest();
  const stream = await ReactServerDOM.renderToReadableStream(
    <ServerRoot>{PageToRender}</ServerRoot>,
    clientManifest,
  );
  const [renderStream, copyStream] = stream.tee();

  // NOTE: copy stream for debugging purpose

  // const reader = copyStream.getReader();
  // //@ts-ignore
  // reader.read().then(function pump({ value, done }) {
  //   console.log(decodeText(value));
  //   if (done) {
  //     return;
  //   }
  //   return reader.read().then(pump);
  // });

  Readable.fromWeb(renderStream).pipe(res);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
