const chai = require('chai');
const expect = chai.expect;

const { Order } = require('../../models/Order');
const ModelValidationError = require('../../models/errors/ModelValidationError');

describe('server/models/Order.js', () => {
    let orderData;
    let order;

    beforeEach(() => {
        orderData = {
            id: '1',
            customerId: '2',
            window: { width: 600, height: 150 },
            comment: 'Some important notes',
            installationTime: new Date('2019-05-05 15:30:00'),
            installer: '3',
            totalPrice: 450,
            assembled: false,
            invoicePaid: true,
            items: [
                {
                    pieces: 2,
                    shutter: {
                        id: '1',
                        name: 'Antigua MDF Shutter',
                        material: 'PLASTIC',
                        parts: [
                            { name: 'rail', pieces: 5 },
                            { name: 'tilt rod', pieces: 3 },
                            { name: 'louver pin', pieces: 8 }
                        ]
                    }
                }
            ]
        };
        order = new Order(orderData);
    }, 10000);
    
    it('should set all fields properly if input is valid', () => {
        expect(order).to.deep.equal(orderData);
    });

    it('should throw ModelValidationError if no customer id is given', () => {
        delete orderData.customerId;
        expect(() => new Order(orderData)).to.throw(ModelValidationError, /customer/);
    });

    it('should throw ModelValidationError if no window is given', () => {
        delete orderData.window;
        expect(() => new Order(orderData)).to.throw(ModelValidationError, /window/);
    });

    it('should throw ModelValidationError if no ordered items are given', () => {
        delete orderData.items;
        expect(() => new Order(orderData)).to.throw(ModelValidationError, /item/);
    });

    it('should throw ModelValidationError if ordered items are not given as array', () => {
        orderData.items = { a: 'b' };
        expect(() => new Order(orderData)).to.throw(ModelValidationError, /item/);
    });

    it('should throw ModelValidationError if ordered items\' array is empty', () => {
        orderData.items = [];
        expect(() => new Order(orderData)).to.throw(ModelValidationError, /item/);
    });
});