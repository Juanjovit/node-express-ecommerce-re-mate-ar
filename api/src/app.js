import express from "express";
import path from "path";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";

import cors from "cors";

import ProductosApiRouter from "./routes/productos.api.routes.js";
import UsuariosApiRouter from "./routes/usuarios.api.routes.js";
import ComprasApiRouter from "./routes/compras.api.routes.js";
import { CORS_ORIGIN } from "./config/env.js";

const app = express();
app.set("view engine", "ejs");

const corsOrigins = CORS_ORIGIN.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (CORS_ORIGIN === "*" || corsOrigins.length === 0) {
  app.use(cors());
} else {
  app.use(
    cors({
      origin: corsOrigins,
    }),
  );
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/productos", ProductosApiRouter);
app.use("/api/usuarios", UsuariosApiRouter);
app.use("/api/compras", ComprasApiRouter);

export default app;
