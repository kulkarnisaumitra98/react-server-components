import { createContext, useContext } from "react";
import type { Navigate } from "./types.js";

export const RouterContext = createContext<{
  navigate?: Navigate;
  invalidateCache?: (pathname: string) => void;
}>({});

export const useRouter = () => {
  return useContext(RouterContext);
};
