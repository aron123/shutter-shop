const chai = require('chai');
const expect = chai.expect;

const { Customer } = require('../../models/Customer');
const ModelValidationError = require('../../models/errors/ModelValidationError');

describe('server/models/Customer.js', () => {

    let customerData;
    let customer;

    beforeEach(() => {
        customerData = {
            id: 1,
            name: 'Bela Toth',
            address: '0000 Abcdef, Asd Str. 16.',
            mobile: '0611234567',
            userName: 'bela'
        };
        customer = new Customer(customerData);
    });

    it('should set all fields properly if input is valid', () => {
        expect(customer).to.deep.equal(customerData); 
    });

    it('should throw ModelValidationError if no customer name is given', () => {
        delete customerData.name;
        expect(() => new Customer(customerData)).to.throw(ModelValidationError, /name/);
    });
    
    it('should throw ModelValidationError if no customer address is given', () => {
        delete customerData.address;
        expect(() => new Customer(customerData)).to.throw(ModelValidationError, /address/);
    });
    
    it('should throw ModelValidationError if no customer username is given', () => {
        delete customerData.userName;
        expect(() => new Customer(customerData)).to.throw(ModelValidationError, /username/);
    });
});