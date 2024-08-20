import App from "./lib/App.js";

const ServerRoot = () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My app</title>
      </head>
      <body>
        <h1>Hello</h1>
        <App />
        <script async type="module" src="/client.js"></script>
      </body>
    </html>
  );
};
export default ServerRoot;
