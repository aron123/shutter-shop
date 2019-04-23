const ModelValidationError = require('./errors/ModelValidationError');

class Part {
    constructor (part) {

        validatePart(part);

        this.pieces = Number(part.pieces);
        this.name = String(part.name);
    }
}

function validatePart (part) {
    if (!part.pieces) {
        throw new ModelValidationError(`No pieces count is given or it is 0 for part, got: ${part.pieces}`);
    }

    if (!part.name) {
        throw new ModelValidationError(`No name is given for part, got: ${part.name}`);
    }
}

module.exports = {
    Part
};