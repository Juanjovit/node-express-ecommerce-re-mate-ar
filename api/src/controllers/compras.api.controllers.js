import ComprasService from "../services/compras.services.js";
import ProductosService from "../services/productos.services.js";

const confirmar = (req, res) => {
  const compra = {
    compra: req.body.compra,
    userId: req.body.userId,
  };

  ComprasService.confirmar(compra)
    .then(function () {
      const productos = compra.compra;

      productos.forEach((producto) => {
        ProductosService.editarProductoVendido(producto._id, {
          ventasTotales: producto.quantity,
        }).catch((err) => {});
      });

      res.status(200).json({});
    })
    .catch(function (err) {
      res.status(500).json({ message: "Error al realizar la compra" });
    });
};

const getAllByUser = (req, res) => {
  const id = req.params.id;

  ComprasService.getAllByUser(id).then((compras) => {
    if (compras) {
      res.status(200).json(compras);
    } else {
      res.status(404);
    }
  });
};

export { confirmar, getAllByUser };
