import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const HTMLTemplate = ({ children }: Props) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/index.css"></link>
        <title>My app</title>
      </head>
      <body>
        {children}
        <script async type="module" src="/client_root.js"></script>
      </body>
    </html>
  );
};
