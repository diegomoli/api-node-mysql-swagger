import { createPool } from "mysql2/promise";
import config from "../config";

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
