import { createContext, useContext } from "react";
import type { Navigate } from "./types.js";

export const RouterContext = createContext<{
  navigate?: Navigate;
  global?: any;
}>({});

export const useRouter = () => {
  return useContext(RouterContext);
};
