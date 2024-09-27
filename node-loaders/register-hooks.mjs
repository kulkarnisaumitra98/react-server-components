// register-hooks.js
import { register } from "node:module";

register("./resolve_as_module.mjs", import.meta.url);
