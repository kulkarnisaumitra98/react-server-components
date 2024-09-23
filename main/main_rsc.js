const register = require("react-server-dom-webpack/node-register");
register();
const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/[\\\/](main|node_modules)[\\\/]/],
  plugins: [
    "@babel/transform-modules-commonjs",
    "@babel/plugin-transform-dynamic-import",
  ],
});

require("../dist/framework/servers/rsc_server.js");
