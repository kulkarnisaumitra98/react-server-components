// custom-loader.js
import fs from "fs/promises";
import { fileURLToPath } from "url";

// Node.js Loader Hook: Resolve Hook
export async function resolve(specifier, context, defaultResolve) {
  // Resolve the module URL normally
  const resolved = await defaultResolve(specifier, context, defaultResolve);

  // If the module has a .js extension
  if (resolved.url.endsWith(".js")) {
    // Read the contents of the file
    const filePath = fileURLToPath(resolved.url);
    const source = await fs.readFile(filePath, "utf8");

    // If it contains import/export, force it to be treated as an ES module
    if (source.includes("import ") || source.includes("export ")) {
      resolved.format = "module";
    }
  }

  return resolved;
}

// Node.js Loader Hook: Load Hook
export async function load(url, context, defaultLoad) {
  // Use default loader behavior
  return defaultLoad(url, context, defaultLoad);
}
