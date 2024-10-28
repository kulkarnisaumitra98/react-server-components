// Main client file which will load react

import { startTransition, use, useState } from "react";
import type { ReactNode } from "react";
import { createRoot, type Container } from "react-dom/client";
import {
  createFromFetch,
  // @ts-ignore
} from "react-server-dom-webpack/client.browser";
import { RouterContext } from "./utils.js";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback.js";

const ClientRoot = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Root />
    </ErrorBoundary>
  );
};

const domNode = document.getElementById("root");
const root = createRoot(domNode as Container);
root.render(<ClientRoot />);

const RSC_URL = window.env?.RSC_URL || "http://localhost:3000";

const createComponentFromFetch = (path: string) => {
  return createFromFetch(fetch(`${RSC_URL}/rsc${path}`));
};

const { pathname, search } = window.location;
let location = pathname + search;
const data = createComponentFromFetch(location);
const initialCache = new Map([[location || "", data]]);

const Root = () => {
  /*  Naive caching mechanism, we simply store the pathname as 
      key and the corresponsing rsc payload stream as value to
      avoid refeching the same page. 
  */
  const [cache, setCache] = useState(initialCache);

  // Fetch the rsc payload from rsc server for any route
  function navigate(path: string) {
    if (path) {
      location = path;
      const rscData = cache.get(path) || createComponentFromFetch(path);
      // Navigation isn't urgent and should be non blocking
      // https://react.dev/reference/react/useTransition#building-a-suspense-enabled-router
      startTransition(() => {
        setCache((prevCache) => {
          const newMap = new Map(prevCache);
          newMap.set(path, rscData);
          return newMap;
        });
      });
    } else {
      alert("Invalid path");
    }
  }

  function invalidateCache(paths: string[]) {
    startTransition(() => {
      setCache((prev) => {
        const newMap = new Map(prev);
        paths.forEach((path) => {
          newMap.delete(path);
        });
        return newMap;
      });
    });
  }

  function refresh(path: string) {
    const rscData = createComponentFromFetch(path);
    startTransition(() => {
      setCache((prev) => {
        const newMap = new Map(prev);
        newMap.set(path, rscData);
        return newMap;
      });
    });
  }

  return (
    <RouterContext.Provider
      value={{ navigate, invalidateCache, cache, refresh }}
    >
      {use<ReactNode>(cache.get(location))}
    </RouterContext.Provider>
  );
};
