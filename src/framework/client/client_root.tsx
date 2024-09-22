import { use } from "react";
import type { ReactNode } from "react";
import { hydrateRoot } from "react-dom/client";
import {
  createFromReadableStream,
  createFromFetch,
  // @ts-ignore
} from "react-server-dom-webpack/client.browser";
import rscStream from "./intialRscStream.ts";

let data;
const ClientRoot = () => {
  data ??= createFromReadableStream(rscStream);
  return use<ReactNode>(data);
};

const root = hydrateRoot(document, <ClientRoot />);

let currentPathname = window.location.pathname;

async function navigate(pathname: string) {
  currentPathname = pathname;
  const clientJSX = createFromFetch(
    fetch(`${window.env.RSC_URL}/rsc${pathname}`),
  );
  data = clientJSX;
  if (pathname === currentPathname) {
    root.render(<ClientRoot />);
  }
}

window.addEventListener(
  "click",
  (e) => {
    const el = e.target as HTMLElement;
    if (el) {
      if (el.tagName !== "A") {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const href = el.getAttribute("href");
      if (!href?.startsWith("/")) {
        return;
      }
      e.preventDefault();
      window.history.pushState(null, "", href);
      navigate(href);
    }
  },
  true,
);

window.addEventListener("popstate", () => {
  navigate(window.location.pathname);
});