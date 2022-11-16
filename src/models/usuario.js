import { DataTypes } from "sequelize";
import db from "../dateBase/connection";

//INTRANET
const Usuario = db.define(
  "usuario_",
  {
    login: { type: DataTypes.STRING },
    pass: { type: DataTypes.STRING },
    tipo: { type: DataTypes.TINYINT },
    estado: { type: DataTypes.TINYINT },
    fk_personal: { type: DataTypes.NUMBER },
  },
  {
    tableName: "usuario_",
  }
);
export default Usuario;
