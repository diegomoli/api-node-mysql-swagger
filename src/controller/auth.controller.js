import { compareSync } from "bcryptjs";
import { response } from "express";
import { generarJWT } from "../helpers/jwt";
import Usuario from "../models/usuario";

const login = async (req, res = response) => {
  const { email: correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({
      where: {
        email: correo,
      },
    });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }
    // SI el usuario está activo
    console.log(usuario.estado);
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    // Verificar la contraseña
    const validPassword = compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id, usuario.name);
    const { usuario: user, id, name, lastname, email, estado, rol } = usuario;
    res.json({
      id,
      user,
      name,
      lastname,
      email,
      rol,
      estado,
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
