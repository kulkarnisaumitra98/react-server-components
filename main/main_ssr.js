const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/[\\\/](main|node_modules)[\\\/]/],
  plugins: [
    "@babel/transform-modules-commonjs",
    "@babel/plugin-transform-dynamic-import",
  ],
});

require("../dist/framework/servers/ssr_server.js");
