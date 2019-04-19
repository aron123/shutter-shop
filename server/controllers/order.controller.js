const handlers = require('./shared/response.handlers');

const Order = require('../models/Order').Order;
const InitialOrderByUser = require('../models/Order').InitialOrderByUser;

const shutterRepository = require('../repositories/shutter.repository');
const repository = require('../repositories/order.repository');

const getAllOrders = async (req, res) => {
    try {
        const orders = await repository.getAllOrders();
        const result = handlers.sanitize(Order, orders);
        handlers.sendSuccessResponse(res, result);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

const getOrdersOfCustomer = async (req, res) => {
    try {
        const orders = await repository.getOrdersOfCustomer(req.params.id);
        const result = handlers.sanitize(Order, orders);
        handlers.sendSuccessResponse(res, result);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await repository.getOrderById(req.params.id);
        const result = handlers.sanitize(Order, order);
        handlers.sendSuccessResponse(res, result);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

const addOrder = async (req, res) => {
    try {
        const orderRequest = req.body;

        // copy whole shutter objects to items array
        for (const i in orderRequest.items) {
            orderRequest.items[i].shutter = await shutterRepository.getShutterById(orderRequest.items[i].shutter);
        }

        const orderToAdd = new InitialOrderByUser(orderRequest);
        const result = await repository.createOrder(orderToAdd);

        handlers.sendSuccessResponse(res, { id: result.insertedId });
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

module.exports = {
    getAllOrders,
    getOrdersOfCustomer,
    getOrderById,
    addOrder
};
