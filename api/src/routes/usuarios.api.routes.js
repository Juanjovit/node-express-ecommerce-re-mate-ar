import express from "express";
import * as UsuariosApiController from "../controllers/usuarios.api.controllers.js";

const router = express.Router();

router.route("/login").post(UsuariosApiController.login);

router.route("/register").post(UsuariosApiController.register);

router.route("/logout").post(UsuariosApiController.logout);

export default router;
