const Window = require('./_window');
const ShutterOrder = require('./_shutterOrder');
const ModelValidationError = require('./errors/ModelValidationError');

export class Order {
    constructor(order) {
        this.id = String(order.id || order._id);
        this.customerId = String(order.customerId);
        this.window = new Window(order.window);
        this.comment = String(order.comment);
        this.installationTime = order.installationTime;
        this.totalPrice = Number(order.totalPrice);
        this.invoicePaid = Boolean(order.invoicePaid);
        this.items = [];

        if (!order.items) {
            throw new ModelValidationError(`No items given for order.`);
        }
        
        if (!Array.isArray(order.items) || order.items.length === 0) {
            throw new ModelValidationError(
                `'items' field should be a not empty array, got: ${JSON.stringify(order.items)}`
            );
        }

        for (const item of order.items) {
            this.items.push(new ShutterOrder(item));
        }
    }
}