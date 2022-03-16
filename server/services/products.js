const ObjectId = require('mongoose').Types.ObjectId;
const {Product, validate} =require( "../models/product_model");
const {BadRequest, Success, NotFound, Created} = require( "../utils/results");
const {validateFilters} =require( "../utils/validation");

/* Find products with filter definition */
/*
 Filters include:
    category: string | undefined
    search: string | undefined
    saleOnly: bool | undefined
 */
const findAll = async (filters) => {
  if(filters && !validateFilters(filters)) return BadRequest("Invalid Filters");
  let f = {}
  if(filters.query) f["name"] = { "$regex": filters.query, "$options": "i" };
  if(filters.category) f["category"] = filters.category;
  if(filters.onSale && (filters.onSale === true || filters.onSale === "true")) f["sale"] = { "$ne": 0 };
  let products = await Product.find(f);
  return Success(products);
}

const findOne = async (id) => {
  if(id !== new ObjectId(id).toString()) return BadRequest("Invalid Product Id");
  let product = await Product.findById(id);
  if(!product) return NotFound("Not found");
  return Success(product);
}


const create = async (product, images) => {
  if(!validate(product)) return BadRequest("Invalid Product");
  if(!images || images.length === 0) return BadRequest("At least 1 product image is expected");
  images.forEach(image => {
    if(!product.images) product.images = []
    console.log(image)
    product.images.push("http://localhost:3000/products/" + image.filename);
  })
  let p = await new Product(product);
  await p.save();
  return Created(p);
}

const edit = async (id, product) => {
  if(!validate(product)) return BadRequest("Invalid Product");
  if(!id) return BadRequest("Product id not found");
  const p = await Product.findByIdAndUpdate(id, product,  {new: true});
  if(!p) return NotFound("Error while updating the product");
  return Success(p);
}

const deleteOne = async (id) => {
  if(id !== new ObjectId(id).toString()) return BadRequest("Invalid Product Id");
  let product = await Product.findByIdAndDelete(id);
  if(!product) return NotFound("Not found");
  return Success(product);
}

exports.findOne = findOne;
exports.findAll = findAll;
exports.create = create;
exports.edit = edit;
exports.delete = deleteOne;