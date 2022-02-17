const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },

    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    avatar: {
        type: String,
        default: 'default.jpg'
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isSeller: {
        type: Boolean,
        default:false
    },
    addresses: [{
        firstLine: String,
        city: String,
        province: String,
        country: String,
        postal_code: String,
        isDefault: Boolean
    }],
    token: {
        value: {type: String},
        date: {type: Date}
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id, firstName: this.firstName, lastName: this.lastName, avatar: this.avatar, isSeller: this.isSeller, email: this.email}, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }).options({ allowUnknown: true });
    return schema.validate(user);
}

function validate_auth(req) {
    const schema = Joi.object({
        email: Joi.string().min(2).max(255).required().email(),
        password: Joi.string().min(2).max(255).required()
    })
    return schema.validate(req);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validate = validateUser;
exports.validate_auth = validate_auth;
