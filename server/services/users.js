const ObjectId = require('mongoose').Types.ObjectId;
const {User, validate, validate_auth} = require("../models/user_model");
const {BadRequest, Success, NotFound, Created} = require("../utils/results");
var bcrypt = require('bcrypt');

const findOne = async (id) => {
    if (id !== new ObjectId(id).toString()) return BadRequest("Invalid User Id");
    let user = await User.findById(id).select('firstName lastName avatar email isSeller addresses');
    if (!user) return NotFound("Not found");
    return Success(user);
}


const create = async (user) => {
    if (validate(user).error)
        return BadRequest("Invalid User");
    let u = await new User(user);
    const salt = await bcrypt.genSalt(10);
    u.password = await bcrypt.hash(user.password, salt);
    await u.save();
    const token = u.generateAuthToken();
    return Created(token);
}

const login = async (user) => {
    if (validate_auth(user).error)
        return BadRequest("Invalid Credentials");
    let u = await User.findOne({email: user.email})
    if (!u)
        return NotFound("User with this email was not found");

    const validPassword = await bcrypt.compare(user.password, u.password);
    if (!validPassword)
        return BadRequest("Invalid Credentials");

    const token = u.generateAuthToken();
    return Success(token);
}

const edit = async (id, user) => {
    if (validate_auth(user).error)
        return BadRequest("Invalid Credentials");

    if (!id)
        return BadRequest("User id not found");

    //const u = await User.findByIdAndUpdate(id, user, {new: true});
    const u = await User.findById(id).then(user => {
        user.render("users/:id", {
            user: user
        });
    }).catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
    });

    if (!u)
        return NotFound("Error while editing the user");

    const token = u.generateAuthToken();
    return Success(token);
}

const update = async (id, user) => {
    if (validate_auth(user).error)
        return BadRequest("Invalid Credentials");

    if (!id)
        return BadRequest("User id not found");

    const u = await User.findByIdAndUpdate(id, user).then(user => {
        user.locals.redirect = `/users/${id}`;
        user.locals.user = user;
    });

    if (!u)
        return NotFound("Error while updating the user");

    const token = u.generateAuthToken();
    return Success(token);
}

const deleteOne = async (id) => {
    if (id !== new ObjectId(id).toString()) return BadRequest("Invalid User Id");
    let user = await User.findByIdAndDelete(id);
    if (!user) return NotFound("Not found");
    return Success(user);
}

exports.findOne = findOne;
exports.create = create;
exports.login = login;
exports.edit = edit;
exports.deleteOne = deleteOne;
exports.update = update;