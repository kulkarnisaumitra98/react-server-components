import express from "express";
import type { Request, Response } from "express";
import path from "path";
// @ts-ignore
import * as ReactServerDOM from "react-server-dom-webpack/server.edge";
import cors from "./cors.js";
import apiRouter from "./api/apiRouter.js";
import { getClientManifest } from "./utils.js";
import { getRoute } from "./server_router.js";
import { Readable } from "stream";
import { ServerRoot } from "./ServerRoot.js";
import type { Paths } from "./server_router.js";
import dotenv from "dotenv";
dotenv.config();
// Creating an Express application
const app = express();

const __dirname = path.resolve();

app.use(cors);
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use("/api", apiRouter);

const getRscResponse = async (req: Request, res: Response) => {
  const pathKey = req.params?.pagePath || "/";
  const PageToRender = await getRoute(pathKey as Paths);
  if (PageToRender) {
    const clientManifest = getClientManifest();
    const stream = await ReactServerDOM.renderToReadableStream(
      <ServerRoot>
        <PageToRender params={req.query} />
      </ServerRoot>,
      clientManifest,
    );

    Readable.fromWeb(stream).pipe(res);
  } else {
    res.status(404);
    res.send("Not Fddound");
  }
};

app.get("/rsc/:pagePath", getRscResponse);
app.get("/rsc", getRscResponse);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running`);
});
