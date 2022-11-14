import { DataTypes } from "sequelize";
import db from "../dateBase/connection";

//XAMP
// const Usuario = db.define("Usuario", {
//   usuario: { type: DataTypes.STRING },
//   password: { type: DataTypes.STRING },
//   email: { type: DataTypes.STRING },
//   name: { type: DataTypes.STRING },
//   lastname: { type: DataTypes.STRING },
//   rol: { type: DataTypes.STRING },
//   estado: { type: DataTypes.BOOLEAN },
// });

//NAVICAT
const Usuario = db.define(
  "usuario_",
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    // },
    login: { type: DataTypes.STRING },
    pass: { type: DataTypes.STRING },
    tipo: { type: DataTypes.TINYINT },
    fk_personal: { type: DataTypes.NUMBER },
    estado: { type: DataTypes.TINYINT },
  },
  {
    tableName: "usuario_",
  }
);
export default Usuario;
