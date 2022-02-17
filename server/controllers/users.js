const express = require('express');
const router = express.Router();
const userService = require("../services/users");

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *     responses:
 *       200:
 *         description: The user with id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await userService.findOne(req.params.id);
    res.status(result.status).send(result.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              isSeller:
 *                type: boolean
 *     responses:
 *       201:
 *         description: The created token.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.post('/signup', async (req, res) => {
  try {
    let user = req.body;
    const result = await userService.create(user);
    res.status(result.status).send(result.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Sign in
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       200:
 *         description: The user token
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.post('/login', async (req, res) => {
  try {
    let user = req.body;
    const result = await userService.login(user);
    res.status(result.status).send(result.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
