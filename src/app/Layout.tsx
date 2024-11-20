import { Header } from "./Header.js";
import { type ReactNode } from "react";

interface Props {
  pageToRender: ReactNode;
}

export const Layout = ({ pageToRender }: Props) => {
  return (
    <div className="layout">
      <Header />
      {pageToRender}
    </div>
  );
};
