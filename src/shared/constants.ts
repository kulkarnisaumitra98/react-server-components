import dotenv from "dotenv";
dotenv.config();

export const RSC_URL = process.env.RSC_URL || "http://localhost:3000";
export const WS_URL = process.env.WS_URL || "ws://localhost:8080";
