import ProductosService from "../services/productos.services.js";
import path from "path";

function getPublicProductosMasVendidos(req, res) {
  const filter = { isPublic: true };

  if (req.query.type) {
    filter.type = req.query.type;
  }

  ProductosService.getPublicProductosMasVendidos(filter).then((productos) => {
    res.status(200).json(productos);
  });
}

function getAllPublicProductos(req, res) {
  const filter = { isPublic: true };

  if (req.query.type) {
    filter.type = req.query.type;
  }

  ProductosService.getAllPublicProductos(filter).then((productos) => {
    res.status(200).json(productos);
  });
}

function getAllProductos(req, res) {
  const filter = {};

  if (req.query.type) {
    filter.type = req.query.type;
  }

  ProductosService.getAllProductos(filter).then((productos) => {
    res.status(200).json(productos);
  });
}

function getProductoById(req, res) {
  const id = req.params.id;

  ProductosService.getProductoById(id).then((producto) => {
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404);
    }
  });
}

function agregarProducto(req, res) {
  const { title, description, price, type, imageAlt } = req.body;

  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: "Es necesario agregar una imagen" });
  }

  const image = req.files.image;
  const imagePath = `http://localhost:2022/images/${Date.now()}_${image.name}`;

  const uploadPath = path.join(
    "public",
    "images",
    `${Date.now()}_${image.name}`
  );

  image.mv(uploadPath, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al subir la imagen", error: err });
    }
  });

  const newProducto = {
    title,
    description,
    price: parseFloat(price),
    image: imagePath,
    type,
    imageAlt,
  };

  ProductosService.agregarProducto(newProducto)
    .then(function (producto) {
      res.status(201).json(producto);
    })
    .catch(function (error) {
      res.status(400).json({ message: error.message });
    });
}
function editarProducto(req, res) {
  const { id, title, description, price, type, image, imageAlt } = req.body;

  let imagePath = image;
  let isNewImage = false;

  if (req.files && req.files.image) {
    isNewImage = true;

    const newImage = req.files.image;

    imagePath = `http://localhost:2022/images/${Date.now()}_${newImage.name}`;

    const uploadPath = path.join(
      "public",
      "images",
      `${Date.now()}_${newImage.name}`
    );

    newImage.mv(uploadPath, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al subir la imagen", error: err });
      }
    });
  }

  const newProducto = {
    id,
    title,
    description,
    price: parseFloat(price),
    image: imagePath,
    type,
    imageAlt,
  };

  ProductosService.editarProducto(id, newProducto, isNewImage)
    .then(function (producto) {
      res.status(201).json(producto);
    })
    .catch(function (error) {
      res.status(400).json({ message: error.message });
    });
}

function eliminarProducto(req, res) {
  const { id } = req.body;

  ProductosService.eliminarProducto(id)
    .then(function (producto) {
      res.status(201).json(producto);
    })
    .catch(function (error) {
      res.status(400).json({ message: error.message });
    });
}

function editarPublicarOcultarProducto(req, res) {
  const { id, isPublic } = req.body;

  const newData = {
    isPublic: !isPublic,
  };

  ProductosService.editarPublicarOcultarProducto(id, newData)
    .then(function (producto) {
      res.status(201).json(producto);
    })
    .catch(function (error) {
      res.status(400).json({ message: error.message });
    });
}

export {
  getPublicProductosMasVendidos,
  getAllPublicProductos,
  getAllProductos,
  getProductoById,
  agregarProducto,
  eliminarProducto,
  editarProducto,
  editarPublicarOcultarProducto,
};
