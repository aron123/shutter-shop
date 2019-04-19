function sanitize (type, result) {
    if (!Array.isArray(result)) {
        return new type(result);
    }

    for (const i in result) {
        result[i] = new type(result[i]);
    }

    return result;
}

function sendErrorResponse (res) {
    res.status(401).json({
        success: false,
        message: 'Server error occured.'
    });
};

function sendSuccessResponse (response, result) {
    response.json({
        success: true,
        data: result
    });
};

module.exports = {
    sanitize,
    sendErrorResponse,
    sendSuccessResponse
};