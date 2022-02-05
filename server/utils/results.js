const BadRequest = (message) => {
    return {
        success: false,
        data: message
    }
}

const SuccessRequest = (message) => {
    return {
        success: true,
        data: message
    }
}

exports.BadRequest = BadRequest;
exports.SuccessRequest = SuccessRequest;