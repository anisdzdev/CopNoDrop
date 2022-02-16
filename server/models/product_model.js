const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    sale: {
        type: mongoose.Types.Decimal128,
        default: 0
    },
    images: [{
        type: String,
        default: 'default.jpg'
    }],
    creator: {
        firstName: String,
        lastName: String,
        id: String
    }
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(product);
}
exports.Product = Product;
exports.productSchema = productSchema;
exports.validate = validateProduct;
