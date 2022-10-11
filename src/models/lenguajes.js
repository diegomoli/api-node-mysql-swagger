import { DataTypes } from "sequelize";
import db from "../dateBase/connection";

const Lenguaje = db.define("Lenguajes", {
  name: { type: DataTypes.STRING },
  programmers: { type: DataTypes.STRING },
});

export default Lenguaje;
