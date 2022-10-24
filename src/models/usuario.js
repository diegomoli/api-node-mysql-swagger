import { DataTypes } from "sequelize";
import db from "../dateBase/connection";

const Usuario = db.define("Usuario", {
  usuario: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  lastname: { type: DataTypes.STRING },
  rol: { type: DataTypes.STRING },
  estado: { type: DataTypes.BOOLEAN },
});

export default Usuario;
