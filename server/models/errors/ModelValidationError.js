class ModelValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ModelValidationError';
    }
}

module.exports = ModelValidationError;