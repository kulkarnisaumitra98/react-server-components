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
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback.js";

const ClientRoot = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
    if (pathname) {
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
    } else {
      alert("Invalid path");
    }
  }

  function invalidateCache(pathname: string) {
    data = createFromFetch(fetch(`${window.env.RSC_URL}/rsc${pathname}`));
    startTransition(() => {
      setCache((prev) => {
        const newMap = new Map(prev);
        newMap.set(pathname, data);
        return newMap;
      });
    });
  }

  return (
    <RouterContext.Provider value={{ navigate, invalidateCache, global }}>
      {use<ReactNode>(data)}
    </RouterContext.Provider>
  );
};
