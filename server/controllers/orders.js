const express = require('express');
const router = express.Router();
const orderService = require("../services/orders");

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve a filtered/unfiltered list of products
 *     tags:
 *       - Products
 *     parameters:
 *      - in: query
 *        name: category
 *        type: string
 *      - in: query
 *        name: query
 *        type: string
 *      - in: query
 *        name: onSale
 *        type: string
 *        enum: ["true", "false"]
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/product'
 */
router.get('/', async (req, res) => {
  try {
    let filters = req.query;
    const result = await productService.findAll(filters);
    res.status(result.status).send(result.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a filtered/unfiltered list of products
 *     tags:
 *       - Products
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *     responses:
 *       200:
 *         description: The product with id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await productService.findOne(req.params.id);
    res.status(result.status).send(result.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: INCOMPLETE - Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/product'
 *     responses:
 *       201:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 */
router.post('/', async (req, res) => {
  try {
    let product = req.body;
    const result = await productService.create(product);
    res.status(result.status).send(result.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
