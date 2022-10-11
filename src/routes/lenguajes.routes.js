import { Router } from "express";
import {
  addLenguajes,
  deleteLenguaje,
  getLenguaje,
  getLenguajes,
  updateLenguaje,
  // } from "../controller/lenguajes.controller";
} from "../controller/language.controller";

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Lenguajes:
 *       type: object
 *       required:
 *         - name
 *         - programmers
 *       properties:
 *
 *         name:
 *           type: string
 *           description: nombre del lenguaje
 *         programmers:
 *           type: integer
 *           description: cantidad de programadores
 *       example:
 *         name: Ruby
 *         programmers: 15
 */

router.get("/api/lenguajes", getLenguajes);
/**
 * @swagger
 * /api/lenguajes:
 *   get:
 *     summary: Lista todos los lenguajes
 *     tags: [Lenguajes]
 *     responses:
 *       200:
 *         description: Listado de los lenguajes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lenguajes'
 */

router.get("/api/lenguajes/:id", getLenguaje);
/**
 * @swagger
 * /api/lenguajes/{id}:
 *   get:
 *     summary: Lista un lenguaje por ID
 *     tags: [Lenguajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Un lenguaje por ID
 *     responses:
 *       200:
 *         description: Lenguaje listado
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lenguajes'
 *       404:
 *         description: Lenguaje no encontrado
 */

router.post("/api/lenguajes", addLenguajes);
/**
 * @swagger
 * /api/lenguajes:
 *   post:
 *     summary: Crear un nuevo lenguaje
 *     tags: [Lenguajes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lenguajes'
 *     responses:
 *       200:
 *         description: El lenguaje ha sido creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lenguajes'
 *       500:
 *         description: Server Error
 */
router.delete("/api/lenguajes/:id", deleteLenguaje);
/**
 * @swagger
 * /api/lenguajes/{id}:
 *   delete:
 *     summary: Eliminar un lenguaje por ID
 *     tags: [Lenguajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Lenguaje por ID
 *
 *     responses:
 *       200:
 *         description: Lenguaje eliminado
 *       404:
 *         description: Lenguaje no encontrado
 */

router.put("/api/lenguajes/:id", updateLenguaje);
/**
 * @swagger
 * /api/lenguajes/{id}:
 *  put:
 *    summary: Actualizar el lenguaje por ID
 *    tags: [Lenguajes]
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
 *            $ref: '#/components/schemas/Lenguajes'
 *    responses:
 *      200:
 *        description: El Lenguajes ha sido actualizado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Lenguajes'
 *      404:
 *        description: The language was not found
 *      500:
 *        description: Some error happened
 */

export default router;
