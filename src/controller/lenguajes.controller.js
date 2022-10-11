import { dbConnection } from "../dateBase/database";
// import { dbConnection } from "../models/configServer";

export const getLenguajes = async (req, res) => {
  try {
    const result = await dbConnection.query(
      "SELECT id,name,programmers FROM lenguajes"
    );
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const getLenguaje = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await dbConnection.query(
      "SELECT id,name,programmers FROM lenguajes WHERE id = ?",
      id
    );
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const addLenguajes = async (req, res) => {
  try {
    const { name, programmers } = req.body;
    console.log(name, programmers);
    const language = { name, programmers };
    if (name === undefined || programmers === undefined) {
      res.status(400).json({ message: "Por favor llena todos los campos" });
    }
    const result = await dbConnection.query(
      "INSERT INTO lenguajes SET ?",
      language
    );
    res.json(`name:${name} programmers:${programmers}`);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteLenguaje = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await dbConnection.query(
      "DELETE FROM lenguajes WHERE id = ?",
      id
    );
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const updateLenguaje = async (req, res) => {
  try {
    const { name, programmers } = req.body;
    const { id } = req.params;
    const language = { id, name, programmers };
    if (id === undefined || name === undefined || programmers === undefined) {
      res.status(400).json({ message: "Por favor llena todos los campos" });
    }
    const result = await dbConnection.query(
      "UPDATE lenguajes SET ? WHERE id = ?",
      [language, id]
    );
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
