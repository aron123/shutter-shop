const Part = require('./_part');
const ModelValidationError = require('./errors/ModelValidationError');

class Shutter {
    constructor (shutter) {
        if (!shutter.material || 
                shutter.material !== 'PLASTIC' && 
                shutter.material !== 'METAL' && 
                shutter.material !== 'WOOD') {
            throw new ModelValidationError(
                `Invalid shutter material given, expected 'PLASTIC', 'METAL' or 'WOOD', got: ${shutter.material}`
            );
        }

        this.id = shutter.id || shutter._id;
        this.name = String(shutter.name);
        this.material = String(shutter.material);
        this.parts = [];

        if (!shutter.parts) {
            throw new ModelValidationError(`No parts given for shutter.`);
        } 
        
        if (!Array.isArray(shutter.parts) || shutter.parts.length === 0) {
            throw new ModelValidationError(
                `'parts' field should be a not empty array, got: ${JSON.stringify(shutter.parts)}`
            );
        }

        for (const part of shutter.parts) {
            this.parts.push(new Part(part));
        }
    }
}

module.exports = Shutter;