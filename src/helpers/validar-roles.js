const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
  console.log(req.usuario);
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { tipo, login } = req.usuario;
  //Reemplazo el rol por el tipo ya que no tengo perfil administrativo
  if (tipo !== 1) {
    return res.status(401).json({
      msg: `${login} no es colaborador - No puede hacer esto`,
    });
  }

  next();
};

module.exports = {
  esAdminRole,
};
