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
        required: true
    },
    images: [{
        type: String,
        default: 'default.jpg'
    }],
    creator: {
        type: String,
        required: true
    },
    isSeller: {
        type: Boolean,
        default:false
    },
    token: {
        value: {type: String},
        date: {type: Date}
    }
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(product);
}
exports.Product = Product;
exports.productSchema = productSchema;
exports.validate = validateProduct;
