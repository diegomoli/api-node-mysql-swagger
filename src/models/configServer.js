const { default: db } = require("../dateBase/connection");

const dbConnection = async () => {
  try {
    await db.authenticate();

    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar BD");
  }
};

module.exports = {
  dbConnection,
};
