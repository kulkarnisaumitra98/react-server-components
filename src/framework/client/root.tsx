// Main client file which will load react

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
      <Root />
    </ErrorBoundary>
  );
};

/*
  When this client file is loaded, our aim is as follows:-
  1. Create a readable stream which will hold the rsc payload chunks 
  for initial hydration.
  2. Collect the RSC payload chunks which were "pushed" from the HTML stream
  in script tags(window object).
  3. Pass the stream to createFromReadableStream which will ultimately create
  the initial component for hydration

  These RSC payload chunks represent the equivalent chunks 
  which were SSRed and we need them for initial hydration
  */
const data = createFromReadableStream(rscStream);
hydrateRoot(document, <ClientRoot />);

const createComponentFromFetch = (path: string) => {
  return createFromFetch(fetch(`${window.env.RSC_URL}/rsc${path}`));
};

const getInitialCache = () => {
  const { pathname, search } = window.location;
  return new Map([[pathname + search || "", data]]);
};

const Root = () => {
  const { pathname, search } = window.location;
  /*  Naive caching mechanism, we simply store the pathname as 
      key and the corresponsing rsc payload stream as value to
      avoid refeching the same page. 
  */
  const [cache, setCache] = useState(getInitialCache);
  const pathValue = pathname + search;

  // Fetch the rsc payload from rsc server for any route
  function navigate(path: string) {
    if (path) {
      window.history.pushState(null, "", path);

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
      {use<ReactNode>(cache.get(pathValue))}
    </RouterContext.Provider>
  );
};
