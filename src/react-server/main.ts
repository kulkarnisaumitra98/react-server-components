"use strict";
// "on the fly" (probably when modules are require'd) compilation
// of React Flight bindings
// @ts-ignore
const reactServerregister = require("react-server-dom-webpack/node-register");
reactServerregister();
// start the server
require("./rsc_server");
