// import { compareSync } from "bcryptjs";
import { response } from "express";
import md5 from "md5";
import { generarJWT } from "../helpers/jwt";
import Usuario from "../models/usuario";

const login = async (req, res = response) => {
  const { login: log, pass } = req.body;
  try {
    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({
      where: {
        login: log,
      },
    });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - user",
      });
    }
    // Si el usuario está activo
    console.log(usuario.estado);
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    // Verificar la contraseña
    // const validPassword = compareSync(pass, usuario.pass);
    // if (!validPassword) {
    //   return res.status(400).json({
    //     msg: "Usuario / Password no son correctos - password",
    //   });
    // }
    if (usuario.pass !== md5(pass)) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id, usuario.login);
    const { login, id, estado, tipo, fk_personal } = usuario;
    res.json({
      id,
      login,
      tipo,
      estado,
      fk_personal,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
