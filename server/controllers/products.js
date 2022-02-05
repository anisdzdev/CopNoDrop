const express = require('express');
const router = express.Router();
const productService = require("../services/products");

/* GET products with search filter. */
router.get('/', async (req, res) => {
  try {
    let filters = req.body.filters;
    const result = await productService.findAll(filters);
    if(result.success)
      res.status(200).send(result.data);
    else
      res.status(400).send(result.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
