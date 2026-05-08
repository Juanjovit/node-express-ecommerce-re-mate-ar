import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { MONGO_DB_NAME, MONGO_URI } from "../config/env.js";

const client = new MongoClient(MONGO_URI);

async function registrarUsuario(usuario) {
  const { name, email, password, isAdmin } = usuario;

  await client.connect();

  const existeUsuario = await client
    .db(MONGO_DB_NAME)
    .collection("Usuarios")
    .findOne({ email });

  if (existeUsuario) {
    throw new Error("El usuario ya existe.");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  await client
    .db(MONGO_DB_NAME)
    .collection("Usuarios")
    .insertOne({ name, email, password: passwordHash, isAdmin });

  return { name, email, password: passwordHash, isAdmin };
}

async function login(usuario) {
  const { email, password } = usuario;

  await client.connect();

  const userFound = await client
    .db(MONGO_DB_NAME)
    .collection("Usuarios")
    .findOne({ email });

  if (!userFound) {
    throw new Error("El usuario o password es incorrecto.");
  }

  const passwordMatch = await bcrypt.compare(password, userFound.password);

  if (!passwordMatch) {
    throw new Error("El usuario o password es incorrecto.");
  }

  return userFound;
}

export default {
  login,
  registrarUsuario,
};

