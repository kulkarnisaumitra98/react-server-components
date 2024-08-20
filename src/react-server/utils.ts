import { readFileSync } from "node:fs";

const decoder = new TextDecoder();
const encoder = new TextEncoder();

export const decodeText = (text: Uint8Array) => {
  return decoder.decode(text);
};

export const encodeText = (text: string) => {
  return encoder.encode(text);
};

export const getClientManifest = () => {
  return readJsonFileSync("./dist/react-client-manifest.json");
};

export const getSSRManifest = () => {
  return readJsonFileSync("./dist/react-ssr-manifest.json");
};

function readJsonFileSync(filePath: string) {
  try {
    // Read file synchronously
    const jsonString = readFileSync(filePath, "utf8");

    // Parse JSON string to object
    const jsonObject = JSON.parse(jsonString);

    return jsonObject;
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    return null;
  }
}

export const wait = (time = 2000) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, time);
  });
};
