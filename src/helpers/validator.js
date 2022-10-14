import Usuario from "../models/usuario";

const userID = async (id) => {
  //Verifica si el usuario Existe
  const existeUsuario = await Usuario.findByPk(id);
  if (!existeUsuario) {
    throw new Error(`El usuario con el id ${id} no existe`);
  }
};

module.exports = {
  userID,
};
