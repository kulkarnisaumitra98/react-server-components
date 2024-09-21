import { Header } from "./Header.js";
import { Suspense, type ReactNode } from "react";

interface Props {
  pageToRender: ReactNode;
}

export const Layout = ({ pageToRender }: Props) => {
  return (
    <div className="layout">
      <Header />
      <Suspense fallback={<p>Loading...</p>}>{pageToRender}</Suspense>
    </div>
  );
};
