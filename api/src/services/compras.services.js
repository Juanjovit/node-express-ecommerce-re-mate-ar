import { MongoClient } from "mongodb";
import { MONGO_DB_NAME, MONGO_URI } from "../config/env.js";

const client = new MongoClient(MONGO_URI);

async function confirmar(compraData) {
  await client.connect();

  const compra = await client
    .db(MONGO_DB_NAME)
    .collection("Compras")
    .insertOne(compraData);

  return compra;
}

async function getAllByUser(userId) {
  await client.connect();

  const compras = await client
    .db(MONGO_DB_NAME)
    .collection("Compras")
    .find({ userId })
    .toArray();

  return compras;
}

export default {
  confirmar,
  getAllByUser,
};

