import express from "express";
import * as ComprasApiController from "../controllers/compras.api.controllers.js";

const router = express.Router();

router.route("/:id").get(ComprasApiController.getAllByUser);

router.route("/confirmar").post(ComprasApiController.confirmar);

export default router;
