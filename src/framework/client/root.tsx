import { startTransition, use, useState } from "react";
import type { ReactNode } from "react";
import { hydrateRoot } from "react-dom/client";
import {
  createFromReadableStream,
  createFromFetch,
  // @ts-ignore
} from "react-server-dom-webpack/client.browser";
import { rscStream } from "./intialRscStream.js";
import { RouterContext, useAnchorClick } from "./utils.js";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

let data: any;
const ClientRoot = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Router />
    </ErrorBoundary>
  );
};

const root = hydrateRoot(document, <ClientRoot />);

const Router = () => {
  const [global, setGlobal] = useState<any>({});

  data ??= createFromReadableStream(rscStream);

  function navigate(pathname: string, params?: any) {
    startTransition(() => {
      let currentPathname = window.location.pathname;
      window.history.pushState(null, "", pathname);
      setGlobal((prev: any) => ({ ...prev, ...params }));
      currentPathname = pathname;
      const clientJSX = createFromFetch(
        fetch(`${window.env.RSC_URL}/rsc${pathname}`),
      );
      data = clientJSX;
      if (pathname === currentPathname) {
        root.render(<ClientRoot />);
      }
    });
  }

  useAnchorClick(navigate);

  return (
    <RouterContext.Provider value={{ navigate, global }}>
      {use<ReactNode>(data)}
    </RouterContext.Provider>
  );
};

function Error({ error }: FallbackProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/index.css"></link>
        <title>My app</title>
      </head>
      <body>
        <div>
          <h1>Application Error</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>{error.stack}</pre>
        </div>
      </body>
    </html>
  );
}
