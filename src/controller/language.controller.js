import Lenguaje from "../models/lenguajes";

export const getLenguajes = async (req, res) => {
  const lenguajes = await Lenguaje.findAll();
  res.json(lenguajes);
};

export const getLenguaje = async (req, res) => {
  const { id } = req.params;
  const lenguaje = await Lenguaje.findByPk(id);
  if (lenguaje) {
    res.json(lenguaje);
  } else
    res.status(404).json({
      msg: `No existe un lenguaje con el id ${id}`,
    });
};

export const addLenguajes = async (req, res) => {
  const { body } = req;
  try {
    const existeName = await Lenguaje.findOne({
      where: {
        name: body.name,
      },
    });

    if (existeName) {
      return res.status(400).json({
        msg: `Ya existe un lenguaje con el nombre ${body.name}`,
      });
    }

    const lenguaje = Lenguaje.build(body);
    await lenguaje.save();

    res.json(lenguaje);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const updateLenguaje = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const lenguaje = await Lenguaje.findByPk(id);
    if (!lenguaje) {
      res.status(404).json({
        msg: `No existe el lenguaje con el id ${id}`,
      });
    } else {
      await lenguaje.update(body);
    }
    //    const existeEmail = await Lenguaje.findOne({
    //         where: {
    //             email: body.email
    //         }
    //     })

    //     if (existeEmail) {
    //         return res.status(400).json({
    //             msg:`Ya existe un lenguaje con el email ${body.email}`
    //         })
    //     }

    res.json(lenguaje);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const deleteLenguaje = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const lenguaje = await Lenguaje.findByPk(id);
  if (!lenguaje) {
    res.status(404).json({
      msg: `No existe el lenguaje con el id ${id}`,
    });
  } else {
    await lenguaje.update({ estado: false });

    //Para la eliminacion fisica
    // await lenguaje.destroy();
  }

  res.json(lenguaje);
};
