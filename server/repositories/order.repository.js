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

const assembleOrder = (id) => {
    return collection.updateOne({ _id: new ObjectId(id) }, { 
        $set: { assembled: true }
    });
}

const payInvoiceOfOrder = (id) => {
    return collection.updateOne({ _id: new ObjectId(id) }, { 
        $set: { invoicePaid: true }
    });
};

const setInstallation = (id, installation) => {
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: installation });
};

const setInvoice = (id, invoice) => {
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: invoice });
};

module.exports = {
    getAllOrders,
    getOrdersOfCustomer,
    getOrderById,
    createOrder,
    assembleOrder,
    payInvoiceOfOrder,
    setInstallation,
    setInvoice
};