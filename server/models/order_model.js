const Joi = require('joi');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: {
        firstName: String,
        lastName: String,
        id: String
    },
    seller: {
        id: String
    },
    address: {
        firstLine: String,
        city: String,
        province: String,
        country: String,
        postal_code: String,
    },
    total: {
        type: mongoose.Types.Decimal128,
        default: 0
    },
    product: {
        id: String,
        quantity: Number
    },
    state: String,
    placedOn: Date
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
    const schema = Joi.object({
        total: Joi.string().min(5).max(50).required(),
        buyer: Joi.string().min(5).max(255).required()
    });

    return schema.validate(order);
}
exports.Order = Order;
exports.orderSchema = orderSchema;
exports.validate = validateOrder;
