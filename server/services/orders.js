const ObjectId = require('mongoose').Types.ObjectId;
const {Order, validate} =require( "../models/order_model");
const {BadRequest, Success, NotFound, Unauthorized, Created} = require( "../utils/results");


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
    if(order.seller.id !== user._id && order.buyer.id !== user._id) return Unauthorized("You cannot access this order");
    return Success(order);
}

const create = async (u_order, user) => {
    if(!validate(u_order)) return BadRequest("Invalid Order");
    let orders = u_order.products;
    let created = [];
    await Promise.all(orders.map(async (or) => {
        let scheme = {
            buyer: {firstName: user.firstName, lastName: user.lastName, id: user._id},
            seller: {id: or.seller_id},
            address: u_order.address,
            total: u_order.total,
            products: {id: or.id, quantity: or.quantity},
            placedOn: Date.now()
        }
        let o = await new Order(scheme);
        await o.save();
        created.push(o);
    }));
    return Created(created);
}

const complete = async (id, user) => {
    if(id !== new ObjectId(id).toString()) return BadRequest("Invalid Order Id");
    let order = await Order.findById(id);
    if(!order) return NotFound("Not found");
    if(order.seller.id !== user._id) return Unauthorized("You cannot complete this order");
    if(order.state === "Complete") return BadRequest("Order already completed");
    if(order.state === "Cancelled") return Success("Cannot complete cancelled order");
    order.state = "Complete";
    await order.save();
    return Success(order);
}

const cancel = async (id, user) => {
    if(id !== new ObjectId(id).toString()) return BadRequest("Invalid Order Id");
    let order = await Order.findById(id);
    if(!order) return NotFound("Not found");
    if(order.buyer.id !== user._id) return Unauthorized("You cannot cancel this order");
    if(order.state === "Complete") return BadRequest("Cannot cancel complete order");
    if(order.state === "Cancelled") return Success("Order already cancelled");
    order.state = "Cancelled";
    await order.save();
    return Success(order);
}

exports.findAll = findAll;
exports.findOne = findOne;
exports.create = create;
exports.complete = complete;
exports.cancel = cancel;
