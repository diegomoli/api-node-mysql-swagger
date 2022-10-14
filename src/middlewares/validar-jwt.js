import { response, request } from "express";
import jwt from "jsonwebtoken";

import Usuario from "../models/usuario";

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    //buscar el usuario por el uid
    const usuario = await Usuario.findByPk(uid);
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe DB",
      });
    }

    // Verificar si el usuario ha sido eliminado
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario eliminado",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
