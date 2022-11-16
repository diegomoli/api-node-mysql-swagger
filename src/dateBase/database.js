import { createPool } from "mysql2/promise";
import config from "../config";

//INICIAR XAMPP para que corra mysql en el puerto 3306

const dbConnection = createPool({
  port: config.port || "4000",
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

module.exports = {
  dbConnection,
};
