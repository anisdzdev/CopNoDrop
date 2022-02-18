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

const edit = async (id, user) => { //INCOMPLETE
    if (validate_auth(user).error)
        return BadRequest("Invalid Credentials");

    if(!id) return BadRequest("User id not found");
    const u = await User.findByIdAndUpdate(id, user,  {new: true});
    if(!u) return NotFound("Error while updating the user");
    const token = u.generateAuthToken();
    return Success(token);
}

exports.findOne = findOne;
exports.create = create;
exports.login = login;
exports.edit = edit;