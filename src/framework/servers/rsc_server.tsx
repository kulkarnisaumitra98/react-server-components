import express from "express";
import type { Request, Response } from "express";
// @ts-ignore
import * as ReactServerDOM from "react-server-dom-webpack/server.edge";
import apiRouter from "./api/apiRouter.js";
import { getClientManifest, cors } from "./utils.js";
import { getRoute, type Paths } from "./router.js";
import { Readable } from "stream";
import { ServerRoot } from "../../app/ServerRoot.js";
import dotenv from "dotenv";
dotenv.config();
// Creating an Express application
const app = express();

app.use(cors);
app.use(express.json());

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
