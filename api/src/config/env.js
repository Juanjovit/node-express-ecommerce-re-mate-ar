import dotenv from "dotenv";

dotenv.config();

function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value || value.trim() === "") {
    throw new Error(`[ENV] Missing required environment variable: ${name}`);
  }

  return value.trim();
}

const PORT_RAW = getRequiredEnv("PORT");
const PORT = Number.parseInt(PORT_RAW, 10);

if (Number.isNaN(PORT) || PORT <= 0) {
  throw new Error(`[ENV] Invalid PORT value: "${PORT_RAW}"`);
}

const MONGO_URI = getRequiredEnv("MONGO_URI");
const MONGO_DB_NAME = getRequiredEnv("MONGO_DB_NAME");
const JWT_SECRET = getRequiredEnv("JWT_SECRET");
const CORS_ORIGIN = getRequiredEnv("CORS_ORIGIN");
const PUBLIC_BASE_URL = getRequiredEnv("PUBLIC_BASE_URL").replace(/\/+$/, "");

export {
  PORT,
  MONGO_URI,
  MONGO_DB_NAME,
  JWT_SECRET,
  CORS_ORIGIN,
  PUBLIC_BASE_URL,
};
