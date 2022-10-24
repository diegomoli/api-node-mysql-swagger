const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
  console.log(req.usuario);
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { rol, name } = req.usuario;

  if (rol !== "admin") {
    return res.status(401).json({
      msg: `${name} no es administrador - No puede hacer esto`,
    });
  }

  next();
};

module.exports = {
  esAdminRole,
};
