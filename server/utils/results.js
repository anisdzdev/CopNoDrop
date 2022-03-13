const BadRequest = (message) => {
    return {
        status:400,
        data: message
    }
}

const NotFound = (message) => {
    return {
        status:404,
        data: message
    }
}

const Unauthorized = (message) => {
    return {
        status:403,
        data: message
    }
}

const Success = (message) => {
    return {
        status: 200,
        data: message
    }
}

const Created = (message) => {
    return {
        status: 201,
        data: message
    }
}

exports.BadRequest = BadRequest;
exports.NotFound = NotFound;
exports.Unauthorized = Unauthorized;
exports.Success = Success;
exports.Created = Created;