import { createContext, useContext } from "react";
import type { Navigate } from "./types.js";

export const RouterContext = createContext<{
  navigate?: Navigate;
  invalidateCache?: (paths: string[]) => void;
  cache?: Map<string, any>;
  refresh?: (path: string) => void;
}>({});

export const useRouter = () => {
  return useContext(RouterContext);
};
