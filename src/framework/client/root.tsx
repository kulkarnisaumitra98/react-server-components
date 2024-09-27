import { startTransition, use, useState } from "react";
import type { ReactNode } from "react";
import { hydrateRoot } from "react-dom/client";
import {
  createFromReadableStream,
  createFromFetch,
  // @ts-ignore
} from "react-server-dom-webpack/client.browser";
import { rscStream } from "./intialRscStream.js";
import { RouterContext } from "./utils.js";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

const ClientRoot = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Router />
    </ErrorBoundary>
  );
};

let data = createFromReadableStream(rscStream);
hydrateRoot(document, <ClientRoot />);

const Router = () => {
  const [global, setGlobal] = useState<any>({});
  const { pathname, search } = window.location;
  const [cache, setCache] = useState(
    new Map([[pathname + search || "", data]]),
  );

  function navigate(pathname: string, params?: any) {
    let currentPathname = window.location.pathname;
    currentPathname = pathname;
    window.history.pushState(null, "", pathname);
    if (params) {
      setGlobal((prev: any) => ({ ...prev, ...params }));
    }

    if (cache.has(currentPathname)) {
      data = cache.get(currentPathname);
    } else {
      data = createFromFetch(fetch(`${window.env.RSC_URL}/rsc${pathname}`));
    }

    startTransition(() => {
      setCache((prev) => {
        const newMap = new Map(prev);
        newMap.set(currentPathname, data);
        return newMap;
      });
    });
  }

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
