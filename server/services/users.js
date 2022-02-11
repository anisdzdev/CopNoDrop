const ObjectId = require('mongoose').Types.ObjectId;
const {User, validate} =require( "../models/user_model");
const {BadRequest, Success, NotFound, Created} = require( "../utils/results");
// const {validateFilters} =require( "../utils/validation");

/* Find products with filter definition */
/*
 Filters include:
    category: string | undefined
    search: string | undefined
    saleOnly: bool | undefined
 */
// const findAll = async (filters) => {
//     if(filters && !validateFilters(filters)) return BadRequest("Invalid Filters");
//     let f = {}
//     if(filters.query) f["name"] = { "$regex": filters.query, "$options": "i" };
//     if(filters.category) f["category"] = filters.category;
//     if(filters.onSale && (filters.onSale === true || filters.onSale === "true")) f["sale"] = { "$ne": 0 };
//     let products = await Product.find(f);
//     return Success(products);
// }

const findOne = async (id) => {
    if(id !== new ObjectId(id).toString()) return BadRequest("Invalid User Id");
    let user = await User.findById(id);
    if(!user) return NotFound("Not found");
    return Success(user);
}


const create = async (user) => {
    if(!validate(user)) return BadRequest("Invalid User");
    let p = new User(user);
    await p.save();
    return Created(p);
}

exports.findOne = findOne;
// exports.findAll = findAll;
exports.create = create;