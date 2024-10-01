// Convert esm modules to commonjs modules on the fly
const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/[\\\/](main|node_modules)[\\\/]/],
  plugins: [
    "@babel/transform-modules-commonjs",
    "@babel/plugin-transform-dynamic-import",
  ],
});

/*  The node register replaces the source code of client components("use client")
    by a createClientModuleProxy function which is later used by rendering functions
    to register a client reference. And when this reference is parsed on client(browser),
    react fetches the corresponding client component by referencing the client manifest json.

    client component => (this.exports = createClientModuleProxy(moduleId))
*/
const register = require("react-server-dom-webpack/node-register");
register();

require("../dist/framework/servers/rsc_server.js");
