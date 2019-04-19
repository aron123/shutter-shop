const handlers = require('./shared/response.handlers');
const { Customer, CustomerRegistration } = require('../models/Customer');

const repository = require('../repositories/customer.repository');

const addCustomer = async (req, res) => {
    try {
        const customerToAdd = new CustomerRegistration(req.body);
        const result = await repository.createCustomer(customerToAdd);
        handlers.sendSuccessResponse(res, { id: result.insertedId });
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer = await repository.getCustomerById(req.params.id);
        const result = handlers.sanitize(Customer, customer);
        handlers.sendSuccessResponse(res, result);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
}

const getAllCustomers = async (req, res) => {
    try {
        const customers = await repository.getAllCustomers();
        const result = handlers.sanitize(Customer, customers);
        handlers.sendSuccessResponse(res, result);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

module.exports = {
    addCustomer,
    getCustomerById,
    getAllCustomers
};