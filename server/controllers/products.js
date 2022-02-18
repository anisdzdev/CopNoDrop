const express = require('express');
const router = express.Router();
const productService = require("../services/products");
const auth = require("../middleware/auth");
const {promisify} = require("util");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const unlinkAsync = promisify(fs.unlink);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/products')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const fileFilter = (req, file, cb) => {
  if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File format should be PNG,JPG,JPEG"), false); // if validation failed then generate error
  }
};

const upload = multer({storage: storage, fileFilter: fileFilter});

/**
 * @swagger
 * /products:
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
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     parameters:
 *       - name: x-auth-token
 *         in: header
 *         description: an authorization token
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               sale:
 *                 type: number
 *     responses:
 *       201:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 */
router.post('/', [auth, upload.array('images', 10)], async (req, res) => {
  try {
    let product = req.body;
    product.creator = {id: req.user._id, firstName: req.user.firstName, lastName: req.user.lastName};
    const result = await productService.create(product, req.files);
    res.status(result.status).send(result.data);
  } catch (e) {
    await Promise.all(req.files?.map(async f => {
      await unlinkAsync(f.path);
    }));
    res.status(500).send(e.message);
  }
});


/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Edit a product
 *     tags:
 *       - Products
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *      - name: x-auth-token
 *        in: header
 *        description: an authorization token
 *        required: true
 *        type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               sale:
 *                 type: number
 *     responses:
 *       200:
 *         description: The deleted product with id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 */
router.put('/:id',auth, async (req, res) => {
  try {
    let product = req.body;
    const result = await productService.edit(req.params.id, product);
    res.status(result.status).send(result.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
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
 *         description: The deleted product with id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await productService.delete(req.params.id);
    res.status(result.status).send(result.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
