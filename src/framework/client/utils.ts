import { createContext, useContext } from "react";

// FIX:
export const RouterContext = createContext<any>({});

export const useRouter = () => {
  const { navigate } = useContext(RouterContext);
  return { navigate };
};
