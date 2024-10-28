const path = require("path");
const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");

module.exports = {
  // Bundle up the root client component
  entry: "./dist/framework/client/root.js",
  devtool: "source-map",
  mode: "development",
  plugins: [
    /*  Purpose of this plugin is to find client side components chunk them 
        and store their references in a manifest file, which will be passed 
        to renderToStream functions.
     
        It seems that this plugin was intended only for bundling client component with initial
        Root component(ServerRoot in our case) on the client side i.e No SSR. 
        But since we have SSR, we won't have any Root component in the client bundle. 
        Either way we can pass the directory path for finding client components and it works. 
        And we need this plugin in client webpack config itself as there is a check for 
        browser enviornment in this plugin.

    */
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
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "client_out"),
    filename: "client_root.js",
  },
};
