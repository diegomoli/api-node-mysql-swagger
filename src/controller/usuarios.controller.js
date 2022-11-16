import Usuario from "../models/usuario";
// import { genSaltSync, hashSync } from "bcryptjs";
import { generarJWT } from "../helpers/jwt";
import md5 from "md5";

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
  const { login: login, pass } = req.body;
  try {
    const existeUser = await Usuario.findOne({
      where: {
        login: login,
      },
    });

    if (existeUser) {
      return res.status(400).json({
        msg: `Ya existe un usuario con el usuario ${login}`,
      });
    }

    let usuario = Usuario.build(req.body);

    // Encriptar contraseña con bcryptjs
    // const salt = genSaltSync();
    // usuario.password = hashSync(password, salt);

    // Encriptar contraseña con md5
    usuario.pass = md5(pass);
    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.login);
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      login: usuario.login,
      tipo: usuario.tipo,
      estado: usuario.estado,
      pass: usuario.pass,
      fk_personal: usuario.fk_personal,
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
  const { pass, ...resto } = req.body;
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);

  //En caso de actualizar la contraseña con bcryptjs
  // if (pass) {
  //   const salt = genSaltSync();
  //   resto.password = hashSync(password, salt);
  // }

  //En caso de actualizar la contraseña con md5
  if (pass) {
    resto.pass = md5(pass);
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
  const { login, tipo, estado } = usuario;
  res.json({
    login,
    tipo,
    estado,
    msg: "Usuario eliminado con éxito",
  });
};
