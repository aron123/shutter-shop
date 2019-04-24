const handlers = require('./shared/response.handlers');
const { Shutter } = require('../models/Shutter');
const repository = require('../repositories/shutter.repository');

const getAllShutters = async (req, res) => {
    try {
        const shutters = await repository.getAllShutters();
        const result = handlers.sanitize(Shutter, shutters);
        handlers.sendSuccessResponse(res, result);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

const getShutterById = async (req, res) => {
    try {
        const shutter = await repository.getShutterById(req.params.id);
        const result = handlers.sanitize(Shutter, shutter);
        handlers.sendSuccessResponse(res, result);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

module.exports = {
    getAllShutters,
    getShutterById
};