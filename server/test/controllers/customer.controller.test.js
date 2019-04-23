const sinon = require('sinon');
const { mockReq, mockRes } = require('sinon-express-mock');
const { expect } = require('chai');

const { Customer, CustomerRegistration } = require('../../models/Customer');

describe('server/controllers/customer.controller.js', () => {

    let customerById;
    let customerList;
    let addCustomerResponse;

    let request;
    let response;

    let databaseMock;
    let customerRepositoryMock;
    let customerController;

    beforeEach(() => {
        customerById = new Customer({
            id: '1',
            name: 'Istvan Kiss',
            address: '3515 Miskolc-Egyetemvaros',
            mobile: '06701478523',
            userName: 'ik'
        });
        customerList = [ customerById ];
        addCustomerResponse = { insertedId: 'addedObjectsId' };

        // disable console.error
        sinon.stub(console, 'error');

        // mock database connector
        databaseMock = require('../../utils/database');
        sinon.stub(databaseMock, 'getDatabase').returns({ collection: () => null });

        // mock repository
        customerRepositoryMock = require('../../repositories/customer.repository');
        sinon.stub(customerRepositoryMock, 'getCustomerById').returns(customerById);
        sinon.stub(customerRepositoryMock, 'getAllCustomers').returns(customerList);
        sinon.stub(customerRepositoryMock, 'createCustomer').returns(addCustomerResponse);

        // mock express req, res
        request = mockReq();
        response = mockRes();

        // require controller
        customerController = require('../../controllers/customer.controller');
    });

    afterEach(() => {
        databaseMock.getDatabase.restore();
        customerRepositoryMock.getCustomerById.restore();
        customerRepositoryMock.getAllCustomers.restore();
        customerRepositoryMock.createCustomer.restore();
        console.error.restore();
    });

    describe('#addCustomer', () => {
        it('should call repository\'s createCustomer function with customer from request', async () => {
            request.body = customerById;
            await customerController.addCustomer(request, response);

            expect(customerRepositoryMock.createCustomer.calledWith(new CustomerRegistration(customerById))).to.be.true;
        });
    
        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            request.body = customerById;
            let expectedResponse = {
                success: true,
                data: { id: addCustomerResponse.insertedId }
            };

            await customerController.addCustomer(request, response);
            expect(response.json.calledWith(expectedResponse)).to.be.true;
        });
    
        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            customerRepositoryMock.createCustomer.restore();
            sinon.stub(customerRepositoryMock, 'createCustomer').throws();

            let expectedResponse = { success: false, message: sinon.match.string };

            await customerController.addCustomer(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse)));
            expect(response.status).to.not.equal(200);
        });
    });

    describe('#getCustomerById', () => {
        it('should call repository\'s getCustomerById function with ID from request', async () => {
            request.params.id = customerById.id;
            await customerController.getCustomerById(request, response);

            expect(customerRepositoryMock.getCustomerById.calledWith(request.params.id)).to.be.true;
        });
    
        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            request.params.id = customerById.id;
            let expectedResponse = { success: true, data: customerById };

            await customerController.getCustomerById(request, response);
            expect(response.json.calledWith(expectedResponse)).to.be.true;
        });
    
        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            customerRepositoryMock.getCustomerById.restore();
            sinon.stub(customerRepositoryMock, 'getCustomerById').throws();

            let expectedResponse = { success: false, message: sinon.match.string };

            await customerController.getCustomerById(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse)));
            expect(response.status).to.not.equal(200);
        });
    });

    describe('#getAllCustomers', () => {
        it('should call repository\'s getAllCustomers function', async () => {
            await customerController.getAllCustomers(request, response);
            expect(customerRepositoryMock.getAllCustomers.called).to.be.true;
        });
    
        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            let expectedResponse = { success: true, data: customerList };

            await customerController.getAllCustomers(request, response);
            expect(response.json.calledWith(expectedResponse)).to.be.true;
        });
    
        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            customerRepositoryMock.getAllCustomers.restore();
            sinon.stub(customerRepositoryMock, 'getAllCustomers').throws();

            let expectedResponse = { success: false, message: sinon.match.string };

            await customerController.getAllCustomers(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse)));
            expect(response.status).to.not.equal(200);
        });
    });
});
