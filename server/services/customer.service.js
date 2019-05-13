const repository = require('../repositories/customer.repository');

const createCustomer = (customer) => {
    return repository.createCustomer(customer);
}

const getCustomerById = (id) => {
    return repository.getCustomerById(id);
}

const getAllCustomers = () => {
    return repository.getAllCustomers();
}

module.exports = {
    createCustomer,
    getCustomerById,
    getAllCustomers
};
