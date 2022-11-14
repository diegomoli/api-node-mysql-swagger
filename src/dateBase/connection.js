import { Sequelize } from "sequelize";
import config from "../config";

const { database, host, user, password } = config;

const db = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
  // dialect: "mariadb",
  // logging:false
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
  useUTC: false,
});

export default db;
