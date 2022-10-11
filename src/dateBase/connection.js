import { Sequelize } from "sequelize";
import config from "../config";

const { database, host, user } = config;
const db = new Sequelize(database, user, "", {
  host: host,
  dialect: "mysql",
  // logging:false
});

export default db;
