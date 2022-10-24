import Usuario from "../models/usuario";
import { genSaltSync, hashSync } from "bcryptjs";
import { generarJWT } from "../helpers/jwt";

export const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
};

export const getUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (usuario) {
    res.json(usuario);
  } else
    res.status(404).json({
      msg: `No existe un usuario con el id ${id}`,
    });
};

export const postUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    if (existeEmail) {
      return res.status(400).json({
        msg: `Ya existe un usuario con el email ${email}`,
      });
    }

    let usuario = Usuario.build(req.body);

    // Encriptar contraseña
    const salt = genSaltSync();
    usuario.password = hashSync(password, salt);

    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      email: usuario.email,
      rol: usuario.rol,
      password: usuario.password,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const putUsuario = async (req, res) => {
  const { password, ...resto } = req.body;
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  //En caso de actualizar la contraseña
  if (password) {
    const salt = genSaltSync();
    resto.password = hashSync(password, salt);
  }

  try {
    if (!usuario) {
      res.status(404).json({
        msg: `No existe el usuario con el id ${id}`,
      });
    } else {
      await usuario.update(resto);
    }

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    res.status(404).json({
      msg: `No existe el usuario con el id ${id}`,
    });
  } else {
    await usuario.update({ estado: false });

    //Para la eliminacion fisica
    // await usuario.destroy();
  }
  const { usuario: user, email, estado } = usuario;
  res.json({
    user,
    email,
    estado,
    msg: "Usuario eliminado con éxito",
  });
};
