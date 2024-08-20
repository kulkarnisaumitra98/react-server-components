const path = require("path");
const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");

module.exports = {
  entry: "./dist/client_root.js",
  mode: "development",
  plugins: [
    new ReactServerWebpackPlugin({
      isServer: false,
      clientReferences: [
        {
          directory: "./server_dist/",
          recursive: true,
          include: /\.(js|ts|jsx|tsx)$/,
        },
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "client.js",
  },
};
