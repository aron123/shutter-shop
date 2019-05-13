const handlers = require('./shared/response.handlers');

const { Order } = require('../models/Order');
const { InitialOrderByUser } = require('../models/Order');
const { Installation } = require('../models/_installation');
const { Invoice } = require('../models/_invoice');

const shutterService = require('../services/shutter.service');
const service = require('../services/order.service');

const getAllOrders = async (req, res) => {
    try {
        const orders = await service.getAllOrders();
        const result = handlers.sanitize(Order, orders);
        handlers.sendSuccessResponse(res, result);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

const getOrdersOfCustomer = async (req, res) => {
    try {
        const orders = await service.getOrdersOfCustomer(req.params.id);
        const result = handlers.sanitize(Order, orders);
        handlers.sendSuccessResponse(res, result);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await service.getOrderById(req.params.id);
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
            orderRequest.items[i].shutter = await shutterService.getShutterById(orderRequest.items[i].shutter);
        }

        const orderToAdd = new InitialOrderByUser(orderRequest);
        const result = await service.createOrder(orderToAdd);

        handlers.sendSuccessResponse(res, { id: result.insertedId });
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

const assembleOrder = async (req, res) => {
    try {
        await service.assembleOrder(req.params.id);
        handlers.sendSuccessResponse(res);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

const payInvoiceOfOrder = async (req, res) => {
    try {
        await service.payInvoiceOfOrder(req.params.id);
        handlers.sendSuccessResponse(res);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

const organizeInstallation = async (req, res) => {
    try {
        const id = req.params.id;
        const installation = new Installation(req.body);
        await service.setInstallation(id, installation);
        handlers.sendSuccessResponse(res);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

const createInvoice = async (req, res) => {
    try {
        const id = req.params.id;
        const invoice = new Invoice(req.body);
        await service.setInvoice(id, invoice);
        handlers.sendSuccessResponse(res);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

module.exports = {
    getAllOrders,
    getOrdersOfCustomer,
    getOrderById,
    addOrder,
    assembleOrder,
    payInvoiceOfOrder,
    organizeInstallation,
    createInvoice
};
