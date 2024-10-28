const path = require("path");
const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");

module.exports = {
  // Bundle up the root client component
  entry: "./dist/framework/client/root.js",
  devtool: "source-map",
  mode: "development",
  plugins: [
    new ReactServerWebpackPlugin({
      isServer: false,
      clientReferences: [
        {
          directory: "./dist",
          recursive: true,
          include: /\.(js|ts|jsx|tsx)$/,
        },
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "client_out"),
    filename: "client_root.js",
  },
};
