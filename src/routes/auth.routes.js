const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controller/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const routerAuth = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *
 *         email:
 *           type: string
 *           description: correo del usuario
 *         password:
 *           type: string
 *           description: contraseña del usuario
 *       example:
 *         email: pedro@gonzales.com
 *         password: 123456a
 */
routerAuth.post(
  "/api/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Para realizar login
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: El usuario se ha logueado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuarios'
 *       500:
 *         description: Server Error
 */

module.exports = routerAuth;
