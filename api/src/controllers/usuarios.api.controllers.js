import jwt from "jsonwebtoken";

import UsuariosService from "../services/usuarios.services.js";
import TokensService from "../services/tokens.services.js";

const login = (req, res) => {
  const usuario = {
    email: req.body.email,
    password: req.body.password,
  };

  UsuariosService.login(usuario)
    .then(function (usuario) {
      const token = jwt.sign({ id: usuario._id }, "CLAVE_SECRETA");

      TokensService.create({ token: token, user_id: usuario._id })
        .then(function () {
          res.status(200).json({ token, usuario });
        })
        .catch(function (err) {
          res.status(500).json({ message: "Error al guardar el token" });
        });
    })
    .catch(function (error) {
      res.status(400).json({ message: error.message });
    });
};

const register = (req, res) => {
  const usuario = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: false,
  };

  UsuariosService.registrarUsuario(usuario)
    .then(function (usuario) {
      res.status(201).json(usuario);
    })
    .catch(function (error) {
      res.status(400).json({ message: error.message });
    });
};

const logout = (req, res) => {
  const token = req.body.token;

  TokensService.deleteByToken(token).then(function () {
    res.status(200).json({ message: "Sesion cerrada" });
  });
};

export { login, register, logout };
