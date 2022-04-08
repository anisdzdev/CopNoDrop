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
 *     parameters:
 *      - in: query
 *        name: sellerMode
 *        type: string
 *        enum: ["true", "false"]
 *      - name: x-auth-token
 *        in: header
 *        description: an authorization token
 *        required: true
 *        type: string
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
 *
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *      - name: x-auth-token
 *        in: header
 *        description: an authorization token
 *        required: true
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


/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags:
 *       - Orders
 *     parameters:
 *       - name: x-auth-token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                      id:
 *                          type: string
 *                      quantity:
 *                          type: string
 *                      seller_id:
 *                          type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   firstLine:
 *                     type: string
 *                   city:
 *                     type: string
 *                   province:
 *                     type: string
 *                   country:
 *                     type: string
 *                   postal_code:
 *                     type: string
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/order'
 */
router.post('/', auth, async (req, res) => {
    try {
        const result = await orderService.create(req.body, req.user);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});


/**
 * @swagger
 * /orders/complete/{id}:
 *   put:
 *     summary: Complete a specific order
 *     tags:
 *       - Orders
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *      - name: x-auth-token
 *        in: header
 *        description: an authorization token
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: The order with id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/order'
 */
router.put('/complete/:id', auth, async (req, res) => {
    try {
        const result = await orderService.complete(req.params.id, req.user);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
})


/**
 * @swagger
 * /orders/cancel/{id}:
 *   put:
 *     summary: Cancel a specific order
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
router.put('/cancel/:id', auth, async (req, res) => {
    try {
        const result = await orderService.cancel(req.params.id, req.user);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

module.exports = router;
