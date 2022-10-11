import { Router } from "express";
import {
  deleteUsuario,
  getUsuario,
  getUsuarios,
  postUsuario,
  putUsuario,
} from "../controller/usuarios.controller";

const userRouter = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuarios:
 *       type: object
 *       required:
 *         - usuario
 *         - password
 *         - email
 *         - name
 *         - lastname
 *         - estado
 *       properties:
 *         usuario:
 *           type: string
 *           description: usuario del usuario
 *         password:
 *           type: string
 *           description: password del usuario
 *         email:
 *           type: string
 *           description: email del usuario
 *         name:
 *           type: string
 *           description: nombre del usuario
 *         lastname:
 *           type: string
 *           description: apellido del usuario
 *         estado:
 *           type: boolean
 *           description: estado en el que se encuentra el usuario
 *       example:
 *          usuario: diegomoli,
 *          password: 123456,
 *          email: diego@moli.com,
 *          name: Diego Nicolas,
 *          lastname: Molinelli,
 *          estado: true,
 */
userRouter.get("/api/usuarios", getUsuarios);
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Listado de los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuarios'
 */

userRouter.get("/api/usuarios/:id", getUsuario);
/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Lista un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Un usuario por ID
 *     responses:
 *       200:
 *         description: Usuario listado
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuarios'
 *       404:
 *         description: Usuario no encontrado
 */
userRouter.post("/api/usuarios", postUsuario);
/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuarios'
 *     responses:
 *       200:
 *         description: El usuario ha sido creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuarios'
 *       500:
 *         description: Server Error
 */
userRouter.delete("/api/usuarios/:id", deleteUsuario);
/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Usuario por ID
 *
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
userRouter.put("/api/usuarios/:id", putUsuario);
/**
 * @swagger
 * /api/usuarios/{id}:
 *  put:
 *    summary: Actualizar el usuario por ID
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Usuarios'
 *    responses:
 *      200:
 *        description: El Usuarios ha sido actualizado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuarios'
 *      404:
 *        description: The users was not found
 *      500:
 *        description: Some error happened
 */

export default userRouter;
