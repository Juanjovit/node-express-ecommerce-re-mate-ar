import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function confirmar(compraData) {
  await client.connect();

  const compra = await client
    .db("AH_P1")
    .collection("Compras")
    .insertOne(compraData);

  return compra;
}

async function getAllByUser(userId) {
  await client.connect();

  const compras = await client
    .db("AH_P1")
    .collection("Compras")
    .find({ userId })
    .toArray();

  return compras;
}

export default {
  confirmar,
  getAllByUser,
};
