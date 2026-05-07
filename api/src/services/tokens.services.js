import { MongoClient } from "mongodb";
import { MONGO_DB_NAME, MONGO_URI } from "../config/env.js";

const client = new MongoClient(MONGO_URI);
const db = client.db(MONGO_DB_NAME);
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

