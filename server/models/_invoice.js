const ModelValidationError = require('./errors/ModelValidationError');

class Invoice {
    constructor (invoice) {
        validateInvoice(invoice);
        this.totalPrice = Number(invoice.totalPrice);
        this.invoicePaid = Boolean(invoice.invoicePaid);
    }
}

function validateInvoice (invoice) {
    if (!invoice.totalPrice) {
        throw new ModelValidationError(
            `Invoice should have 'totalPrice' property, got: ${invoice.totalPrice}`
        );
    }
}

module.exports = {
    Invoice
};