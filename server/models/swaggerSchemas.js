const {Product} = require("./product_model");
const {User} = require("./user_model");
const m2s = require("mongoose-to-swagger");

const options = {
    props: ['minlength', 'maxlength','default','unique'],
    omitFields: ['_id'],
};

module.exports =  {
    user: m2s(User, options),
    product: m2s(Product, options)
};