import express from "express";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import router from "./routes/lenguajes.routes";
import userRouter from "./routes/usuarios.routes";
require("dotenv").config();
const cors = require("cors");
// import path from "path";
const path = require("path");
import config from "./config";

const apiPath = {
  usuarios: "/api/usuarios",
};
// Crear el servidor de express
const app = express();

//Setting
app.set("port", process.env.PORT);

//Swagger
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node SQL API",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://${config.host}:${process.env.PORT}`,
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

//Middlewares
app.use(morgan("dev"));
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSDoc(swaggerSpec))
);
// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

//ROUTE
app.use(router);
app.use(userRouter);

export default app;
