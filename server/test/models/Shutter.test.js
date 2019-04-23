const chai = require('chai');
const expect = chai.expect;

const { Shutter } = require('../../models/Shutter');
const ModelValidationError = require('../../models/errors/ModelValidationError');

describe('server/models/Shutter.js', () => {
    let shutterData;
    let shutter;

    beforeEach(() => {
        shutterData = {
            id: 1,
            name: 'Very magic shutter',
            material: 'PLASTIC',
            parts: [
                { pieces: 6, name: 'screw' },
                { pieces: 3, name: 'tilt rod' },
                { pieces: 8, name: 'magic material' }
            ]
        };
        shutter = new Shutter(shutterData);
    });

    it('should set all fields properly if input is valid', () => {
        expect(shutter).to.deep.equal(shutterData);
    });

    it('should throw ModelValidationError if no shutter name is given', () => {
        delete shutterData.name;
        expect(() => new Shutter(shutterData)).to.throw(ModelValidationError, /name/);
    });

    it('should throw ModelValidationError if no shutter material is given', () => {
        delete shutterData.material;
        expect(() => new Shutter(shutterData)).to.throw(ModelValidationError, /material/);
    });

    it('should throw ModelValidationError if shutter material is not METAL, WOOD, or PLASTIC', () => {
        shutterData.material = 'PAPER';
        expect(() => new Shutter(shutterData)).to.throw(ModelValidationError, /material/);
    });

    it('should throw ModelValidationError if no shutter parts are given', () => {
        delete shutterData.parts;
        expect(() => new Shutter(shutterData)).to.throw(ModelValidationError, /part/);
    });

    it('should throw ModelValidationError if shutter parts are not given as array', () => {
        shutterData.parts = { pieces: 2, name: 'screw' };
        expect(() => new Shutter(shutterData)).to.throw(ModelValidationError, /part/);
    });

    it('should throw ModelValidationError if at least one shutter part is given in inappropriate structure', () => {
        shutterData.parts = [
            { pieces: 2, name: 'screw' },
            { qty: 7, itemName: 'milk' }
        ];
        expect(() => new Shutter(shutterData)).to.throw(ModelValidationError, /part/);
    });

    it('should throw ModelValidationError if pieces field in part is zero', () => {
        shutterData.parts = [
            { pieces: 0, name: 'screw' }
        ];
        expect(() => new Shutter(shutterData)).to.throw(ModelValidationError, /part/);
    });
});