import { Router } from "express";
import { check } from "express-validator";
import {
  deleteUsuario,
  getUsuario,
  getUsuarios,
  postUsuario,
  putUsuario,
} from "../controller/usuarios.controller";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";
import { userID } from "../helpers/validator";
import { esAdminRole } from "../helpers/validar-roles";
const userRouter = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuarios:
 *       type: object
 *       required:
 *         - id
 *         - login
 *         - pass
 *         - tipo
 *         - fk_personal
 *         - estado
 *       properties:
 *         id:
 *           type: number
 *           description: id del usuario
 *         login:
 *           type: string
 *           description: usuario del usuario
 *         pass:
 *           type: string
 *           description: password del usuario
 *         fk_personal:
 *           type: number
 *           description: dni del usuario o legajo del socio
 *         tipo:
 *           type: number
 *           description: rol del usuario (1:colaborador, 2:socio,...)
 *         lastname:
 *           type: string
 *           description: apellido del usuario
 *         estado:
 *           type: boolean
 *           description: estado en el que se encuentra el usuario
 *       example:
 *          id: 5561
 *          login: test
 *          pass: 123456a
 *          tipo: 1
 *          fk_personal: 33554411
 *          estado: 1
 *
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
userRouter.post(
  "/api/usuarios",
  [
    // middlewares
    // validarJWT,
    check("login", "El usuario es obligatorio").not().isEmpty(),
    check("tipo", "El tipo es obligatorio").not().isEmpty(),
    check("fk_personal", "El fk_personal es obligatorio").not().isEmpty(),
    check("pass", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  postUsuario
);
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
userRouter.delete("/api/usuarios/:id", validarJWT, esAdminRole, deleteUsuario);
/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         usuario: id
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

userRouter.put(
  "/api/usuarios/:id",
  [
    // middlewares
    check("id").custom(userID),
    validarJWT,
    esAdminRole,
    validarCampos,
  ],
  putUsuario
);
/**
 * @swagger
 * /api/usuarios/{id}:
 *  put:
 *    summary: Actualizar el usuario por ID
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        usuario: id
 *        schema:
 *          type: string
 *        required: true
 *        description: usuario por ID
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
