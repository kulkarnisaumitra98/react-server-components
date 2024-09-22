import { readFileSync } from "node:fs";
import type { NextFunction, Request, Response } from "express";

const decoder = new TextDecoder();
const encoder = new TextEncoder();

export const decodeText = (text: Uint8Array) => {
  return decoder.decode(text);
};

export const encodeText = (text: string) => {
  return encoder.encode(text);
};

export const getClientManifest = () => {
  return readJsonFileSync("./client_out/react-client-manifest.json");
};

export const getSSRManifest = () => {
  return readJsonFileSync("./client_out/react-ssr-manifest.json");
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

export const cors = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  ); // Allow specific HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};

export const wait = (time = 2000) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, time);
  });
};
