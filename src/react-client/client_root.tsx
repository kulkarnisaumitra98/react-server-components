import { use } from "react";
import type { ReactNode } from "react";
import { hydrateRoot } from "react-dom/client";
// @ts-ignore
import { createFromReadableStream } from "react-server-dom-webpack/client.browser";
import rscStream from "./intialRscStream.js";

let data;
const ClientRoot = () => {
  data ??= createFromReadableStream(rscStream);
  return use<ReactNode>(data);
};

hydrateRoot(document, <ClientRoot />);
