import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("AH_P1");
const tokens = db.collection("tokens");

async function create(token) {
  const newToken = { ...token };

  await client.connect();
  await tokens.insertOne(newToken);

  return newToken;
}

async function deleteByToken(token) {
  await client.connect();

  return tokens.deleteOne({ token });
}

export default { create, deleteByToken };
