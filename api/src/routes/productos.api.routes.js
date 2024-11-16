import express from "express";
import * as ProductosApiController from "../controllers/productos.api.controllers.js";

const router = express.Router();

router.route("/").get(ProductosApiController.getAllPublicProductos);

router
  .route("/masVendidos")
  .get(ProductosApiController.getPublicProductosMasVendidos);

router.route("/all").get(ProductosApiController.getAllProductos);

router.route("/agregar").post(ProductosApiController.agregarProducto);

router.route("/editar").put(ProductosApiController.editarProducto);

router
  .route("/publicarOcultar")
  .put(ProductosApiController.editarPublicarOcultarProducto);

router.route("/eliminar").delete(ProductosApiController.eliminarProducto);

router.route("/:id").get(ProductosApiController.getProductoById);

export default router;
