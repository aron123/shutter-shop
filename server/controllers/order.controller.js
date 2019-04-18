const repository = require('../repositories/order.repository');

const getAllOrders = async (req, res) => {
    try {
        const orders = await repository.getAllOrders();
        handleResponse(res, orders);
    } catch (e) {
        handleError(res);
    }
};

const getOrdersOfCustomer = async (req, res) => {
    try {
        const orders = await repository.getOrdersOfCustomer(req.params.id);
        handleResponse(res, orders);
    } catch {
        handleError(res);
    }
};

const addOrder = async (req, res) => {
    try {
        delete req.body.id;
        delete req.body._id;

        const result = await repository.createOrder(req.body);

        handleResponse(res, { id: result.insertedId });
    } catch {
        handleError(res);
    }
};

const handleError = (res) => {
    res.status(401).json({
        success: false,
        message: 'Server error occured.'
    });
};

const handleResponse = (response, result) => {
    response.json({
        success: true,
        data: result
    });
};

module.exports = {
    getAllOrders,
    getOrdersOfCustomer,
    addOrder
};
