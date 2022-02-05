/* Find products with filter definition */
/*
 Filters include:
    category: string | undefined
    search: string | undefined
    saleOnly: bool | undefined
 */
const {Product} =require( "../models/product_model");
const {BadRequest, SuccessRequest} = require( "../utils/results");
const {validateFilters} =require( "../utils/validation");

const findAll = async (filters) => {
  if(!validateFilters(filters)) return BadRequest("")
  let products = await Product.find();
  return SuccessRequest(products)
}

exports.findAll = findAll;