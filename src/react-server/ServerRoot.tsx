import type { ReactNode } from "react";
import { Layout } from "./app/Layout.js";

interface Props {
  children: ReactNode;
}

export const ServerRoot = ({ children }: Props) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/index.css"></link>
        <title>My app</title>
      </head>
      <body>
        <Layout pageToRender={children} />
        <script async type="module" src="/client.js"></script>
        <script src="/reload.js"></script>
      </body>
    </html>
  );
};
