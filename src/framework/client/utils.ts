import { createContext, useContext, useEffect } from "react";
import type { Navigate } from "./types.js";

export const RouterContext = createContext<{
  navigate?: Navigate;
  global?: any;
}>({});

export const useRouter = () => {
  return useContext(RouterContext);
};

export const useAnchorClick = (navigate: Navigate) => {
  useEffect(() => {
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
          navigate(href);
        }
      },
      true,
    );

    window.addEventListener("popstate", () => {
      navigate(window.location.pathname);
    });
  }, []);
};
