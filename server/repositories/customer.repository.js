const ObjectId = require('mongodb').ObjectId;
const collection = require('../utils/database').getDatabase().collection('customers');

const createCustomer = (customer) => {
    return collection.insertOne(customer);
}

const getCustomerById = (id) => {
    return collection.findOne({ _id: new ObjectId(id) });
}

const getAllCustomers = () => {
    return collection.find().toArray();
}

module.exports = {
    createCustomer,
    getCustomerById,
    getAllCustomers
};