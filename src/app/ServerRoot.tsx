import type { ReactNode } from "react";
import { Layout } from "./Layout.js";

interface Props {
  children: ReactNode;
}

export const ServerRoot = ({ children }: Props) => {
  return <Layout pageToRender={children} />;
};
