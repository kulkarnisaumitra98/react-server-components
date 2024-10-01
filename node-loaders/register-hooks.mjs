// We will keep SSR server as esm module (facing some issue while importing components in react-dom package.)

// This hook is treat modules in dist folder as esm modules and not commonjs modules
import { register } from "node:module";

register("./resolve_as_esm_module.mjs", import.meta.url);
