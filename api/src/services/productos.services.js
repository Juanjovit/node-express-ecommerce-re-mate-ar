import { MongoClient, ObjectId } from "mongodb";
import path from "path";
import fs from "fs";
import { MONGO_DB_NAME, MONGO_URI } from "../config/env.js";

const client = new MongoClient(MONGO_URI);

async function getPublicProductosMasVendidos(filter) {
  return client.connect().then(() => {
    return client
      .db(MONGO_DB_NAME)
      .collection("Productos")
      .find(filter)
      .sort({ ventasTotales: -1 })
      .limit(3)
      .toArray();
  });
}

async function getAllPublicProductos(filter) {
  return client.connect().then(() => {
    return client
      .db(MONGO_DB_NAME)
      .collection("Productos")
      .find(filter)
      .toArray();
  });
}

async function getAllProductos(filter) {
  return client.connect().then(() => {
    return client
      .db(MONGO_DB_NAME)
      .collection("Productos")
      .find(filter)
      .toArray();
  });
}

async function getProductoById(id) {
  await client.connect();
  const result = await client
    .db(MONGO_DB_NAME)
    .collection("Productos")
    .findOne({ _id: new ObjectId(id) });

  return result;
}

async function agregarProducto(producto) {
  await client.connect();
  const result = await client
    .db(MONGO_DB_NAME)
    .collection("Productos")
    .insertOne(producto);

  return result;
}

async function editarProducto(id, producto, isNewImage) {
  await client.connect();

  if (isNewImage) {
    const productoInCompra = await client
      .db(MONGO_DB_NAME)
      .collection("Compras")
      .findOne({ "compra._id": id });

    if (!productoInCompra) {
      const producto = await client
        .db(MONGO_DB_NAME)
        .collection("Productos")
        .findOne({ _id: new ObjectId(id) });

      const splitUrl = producto.image.split("/");
      const imageName = splitUrl[splitUrl.length - 1];

      const imagePath = path.join("public", "images", imageName);

      fs.unlink(imagePath, (err) => {
        if (err) {
          throw new Error("Error al eliminar la imagen");
        }
      });
    }
  }

  const result = await client
    .db(MONGO_DB_NAME)
    .collection("Productos")
    .updateOne({ _id: new ObjectId(id) }, { $set: producto });

  return result;
}

async function editarProductoVendido(id, producto) {
  await client.connect();

  const result = await client
    .db(MONGO_DB_NAME)
    .collection("Productos")
    .updateOne(
      { _id: new ObjectId(id) },
      { $inc: { ventasTotales: producto.ventasTotales } },
    );

  return result;
}

async function eliminarProducto(id) {
  await client.connect();

  // Runtime image deletion is disabled for hosting compatibility.
  // Legacy behavior (local upload flow):
  // const productoInCompra = await client
  //   .db(MONGO_DB_NAME)
  //   .collection("Compras")
  //   .findOne({ "compra._id": id });
  //
  // if (!productoInCompra) {
  //   const producto = await client
  //     .db(MONGO_DB_NAME)
  //     .collection("Productos")
  //     .findOne({ _id: new ObjectId(id) });
  //
  //   const splitUrl = producto.image.split("/");
  //   const imageName = splitUrl[splitUrl.length - 1];
  //
  //   const imagePath = path.join("public", "images", imageName);
  //
  //   fs.unlink(imagePath, (err) => {
  //     if (err) {
  //       throw new Error("Error al eliminar la imagen");
  //     }
  //   });
  // }

  const result = await client
    .db(MONGO_DB_NAME)
    .collection("Productos")
    .deleteOne({ _id: new ObjectId(id) });

  return result;
}

async function editarPublicarOcultarProducto(id, isPublic) {
  await client.connect();

  const result = await client
    .db(MONGO_DB_NAME)
    .collection("Productos")
    .updateOne({ _id: new ObjectId(id) }, { $set: isPublic });

  return result;
}

export default {
  getPublicProductosMasVendidos,
  getAllPublicProductos,
  getAllProductos,
  getProductoById,
  agregarProducto,
  eliminarProducto,
  editarProducto,
  editarPublicarOcultarProducto,
  editarProductoVendido,
};

