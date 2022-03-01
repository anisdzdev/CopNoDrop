const ObjectId = require('mongoose').Types.ObjectId;
const {Order, validate} =require( "../models/order_model");
const {BadRequest, Success, NotFound} = require( "../utils/results");


const findAll = async (sellerMode, user) => {
    let f = {}
    if(sellerMode === true || sellerMode === "true") f["seller.id"] = user._id;
    else f["buyer.id"] = user._id;
    let orders = await Order.find(f);
    return Success(orders);
}

const findOne = async (id, user) => {
    if(id !== new ObjectId(id).toString()) return BadRequest("Invalid Order Id");
    let order = await Order.findById(id);
    if(!order) return NotFound("Not found");
    return Success(order);
}
