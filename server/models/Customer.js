const ModelValidationError = require('./errors/ModelValidationError');

class Customer {
    constructor (customer) {

        validateCustomer(customer);

        this.id = customer.id || customer._id;
        this.name = String(customer.name);
        this.address = String(customer.address);
        this.mobile = String(customer.mobile);
        this.userName = String(customer.userName)
    }
}

class CustomerRegistration extends Customer {
    constructor (customer) {
        super({
            id: undefined,
            name: customer.name,
            address: customer.address,
            mobile: customer.mobile,
            userName: customer.userName
        });
    }
}

function validateCustomer (customer) {
    if (!customer.name) {
        throw new ModelValidationError(`No name given for customer, got: ${customer.name}`);
    }

    if (!customer.address) {
        throw new ModelValidationError(`No address given for customer, got: ${customer.address}`);
    }

    if (!customer.userName) {
        throw new ModelValidationError(`No username given for customer, got: ${customer.userName}`);
    }
}

module.exports = {
    Customer,
    CustomerRegistration
};