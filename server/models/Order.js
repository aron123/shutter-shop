const Window = require('./_window').Window;
const ShutterOrder = require('./_shutterOrder').ShutterOrder;
const ModelValidationError = require('./errors/ModelValidationError');

class Order {
    constructor(order) {

        validateOrder(order);

        this.id = order.id || order._id;
        this.customerId = String(order.customerId);
        this.window = new Window(order.window);
        this.comment = order.comment ? String(order.comment) : order.comment;
        this.installationTime = order.installationTime ? new Date(order.installationTime) : order.installationTime;
        this.installer = order.installer ? String(order.installer) : order.installer;
        this.totalPrice = order.totalPrice ? Number(order.totalPrice) : order.totalPrice;
        this.assembled = Boolean(order.assembled);
        this.invoicePaid = Boolean(order.invoicePaid);
        this.items = [];

        for (const item of order.items) {
            this.items.push(new ShutterOrder(item));
        }
    }
}

class InitialOrderByUser extends Order {
    constructor (order) {
        super({
            id: undefined,
            customerId: order.customerId,
            window: order.window,
            comment: order.comment,
            items: order.items,
            installationTime: null,
            installer: null,
            totalPrice: null,
            assembled: false,
            invoicePaid: false
        });
    }
}

function validateOrder (order) {
    if (!order.customerId) {
        throw new ModelValidationError(`No customerId is given for order, got: ${order.customerId}`);
    }

    if (!order.window) {
        throw new ModelValidationError(`No window is given for order, got: ${order.window}`);
    }

    if (!order.items) {
        throw new ModelValidationError(`No items given for order.`);
    }
    
    if (!Array.isArray(order.items) || order.items.length === 0) {
        throw new ModelValidationError(
            `'items' field should be a not empty array, got: ${JSON.stringify(order.items)}`
        );
    }
}

module.exports = {
    Order,
    InitialOrderByUser
};