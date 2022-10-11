import Usuario from "../models/usuario";

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
  const { body } = req;
  console.log(body.email);
  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email: body.email,
      },
    });

    if (existeEmail) {
      return res.status(400).json({
        msg: `Ya existe un usuario con el email ${body.email}`,
      });
    }

    const usuario = Usuario.build(body);
    await usuario.save();

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const putUsuario = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      res.status(404).json({
        msg: `No existe el usuario con el id ${id}`,
      });
    } else {
      await usuario.update(body);
    }
    //    const existeEmail = await Usuario.findOne({
    //         where: {
    //             email: body.email
    //         }
    //     })

    //     if (existeEmail) {
    //         return res.status(400).json({
    //             msg:`Ya existe un usuario con el email ${body.email}`
    //         })
    //     }

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

  res.json(usuario);
};
