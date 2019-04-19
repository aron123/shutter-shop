const ObjectId = require('mongodb').ObjectId;

const collection = require('../utils/database').getDatabase().collection('orders');

const getAllOrders = () => {
    return collection.find().toArray();
};

const getOrdersOfCustomer = (customerId) => {
    return collection.find({ customerId }).toArray();
};

const getOrderById = (id) => {
    return collection.findOne({ _id: new ObjectId(id) });
};

const createOrder = (order) => {
    return collection.insertOne(order);
};

module.exports = {
    getAllOrders,
    getOrdersOfCustomer,
    getOrderById,
    createOrder
};