class Customer {
    constructor (customer) {
        this.id = customer.id || customer._id;
        this.name = String(customer.name);
        this.address = String(customer.address);
        this.mobile = String(customer.mobile);
        this.userName = String(customer.userName)
    }
}

module.exports = Customer;