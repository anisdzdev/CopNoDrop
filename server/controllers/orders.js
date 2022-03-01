const express = require('express');
const router = express.Router();
const orderService = require("../services/orders");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve a list of orders
 *     tags:
 *       - Orders
 *      - in: query
 *        name: sellerMode
 *        type: string
 *        enum: ["true", "false"]
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/order'
 */
router.get('/', auth, async (req, res) => {
    try {
        const result = await orderService.findAll(req.query.sellerMode, req.user);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Retrieve a specific order
 *     tags:
 *       - Orders
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *     responses:
 *       200:
 *         description: The order with id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/order'
 */
router.get('/:id', auth, async (req, res) => {
    try {
        const result = await orderService.findOne(req.params.id, req.user);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;
