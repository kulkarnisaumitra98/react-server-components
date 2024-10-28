import type { ReactNode } from "react";
import { Layout } from "./Layout.js";
import { HTMLTemplate } from "../framework/shared/HTMLTemplate.js";

interface Props {
  children: ReactNode;
}

export const ServerRoot = ({ children }: Props) => {
  return (
    <HTMLTemplate>
      <Layout pageToRender={children} />
    </HTMLTemplate>
  );
};
