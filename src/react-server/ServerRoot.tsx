import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ServerRoot = ({ children }: Props) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My app</title>
      </head>
      <body>
        <h1>Hello</h1>
        {children}
        <script async type="module" src="/client.js"></script>
      </body>
    </html>
  );
};
