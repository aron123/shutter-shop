const repository = require('../repositories/order.repository');

const getAllOrders = () => {
    return repository.getAllOrders();
};

const getOrdersOfCustomer = (customerId) => {
    return repository.getOrdersOfCustomer(customerId);
};

const getOrderById = (id) => {
    return repository.getOrderById(id);
};

const createOrder = (order) => {
    return repository.createOrder(order);
};

const assembleOrder = (id) => {
    return repository.assembleOrder(id);
}

const payInvoiceOfOrder = (id) => {
    return repository.payInvoiceOfOrder(id);
};

const setInstallation = (id, installation) => {
    return repository.setInstallation(id, installation);
};

const setInvoice = (id, invoice) => {
    return repository.setInvoice(id, invoice);
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
