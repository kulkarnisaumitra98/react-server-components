import express from "express";
import path from "path";
// @ts-ignore
import * as ReactServerDOM from "react-server-dom-webpack/server";
import { createElement } from "react";
import cors from "./cors.js";
import { getClientManifest } from "./utils.js";
import ServerRoot from "./ServerRoot.js";

// Creating an Express application
const app = express();

// Serving static files from the 'public' folder
const __dirname = path.resolve();

app.use(cors);

app.use(express.static(path.join(__dirname, "dist")));

app.get("/rsc", (_, res) => {
  const ServerRootEl = createElement(ServerRoot);
  const clientManifest = getClientManifest();
  const { pipe } = ReactServerDOM.renderToPipeableStream(
    ServerRootEl,
    clientManifest,
  );
  pipe(res);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
