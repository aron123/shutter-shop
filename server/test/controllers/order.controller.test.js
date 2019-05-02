const sinon = require('sinon');
const { mockReq, mockRes } = require('sinon-express-mock');
const { expect } = require('chai');

const { Installation } = require('../../models/_installation');
const { Invoice } = require('../../models/_invoice');
const { Order } = require('../../models/Order');

describe('server/controllers/order.controller.js', () => {

    let orderById;
    let orderList;

    let request;
    let response;

    let databaseMock;
    let orderRepositoryMock;
    let orderController;

    beforeEach(() => {
        orderById = new Order({
            customerId: '5cb89bc3edcdb023a08ef0bd',
            comment: null,
            installationTime: null,
            installer: '5cb897dfedcdb023a08ef0a4',
            totalPrice: 350,
            assembled: false,
            invoicePaid: true,
            items: [
                {
                    pieces: 1,
                    window: { width: 660, height: 150 },
                    shutter: {
                        name: "Bermuda ABS Shutter",
                        material: "METAL",
                        parts: [ 
                            { pieces: 5, name: 'rail' }, 
                            { pieces: 7, name: 'stile' }
                        ]
                    }
                }
            ]
        });
        orderList = [orderById];

        // disable console.error
        sinon.stub(console, 'error');

        // mock database connector
        databaseMock = require('../../utils/database');
        sinon.stub(databaseMock, 'getDatabase').returns({ collection: () => null });

        // mock repository
        orderRepositoryMock = require('../../repositories/order.repository');
        sinon.stub(orderRepositoryMock, 'getAllOrders').returns(orderList);
        sinon.stub(orderRepositoryMock, 'getOrdersOfCustomer').returns(orderList);
        sinon.stub(orderRepositoryMock, 'getOrderById').returns(orderById);
        sinon.stub(orderRepositoryMock, 'assembleOrder');
        sinon.stub(orderRepositoryMock, 'payInvoiceOfOrder');
        sinon.stub(orderRepositoryMock, 'setInstallation');
        sinon.stub(orderRepositoryMock, 'setInvoice');

        // mock express req, res
        request = mockReq();
        response = mockRes();

        // require controller
        orderController = require('../../controllers/order.controller');
    });

    afterEach(() => {
        databaseMock.getDatabase.restore();
        orderRepositoryMock.getAllOrders.restore();
        orderRepositoryMock.getOrdersOfCustomer.restore();
        orderRepositoryMock.getOrderById.restore();
        orderRepositoryMock.assembleOrder.restore();
        orderRepositoryMock.payInvoiceOfOrder.restore();
        orderRepositoryMock.setInstallation.restore();
        orderRepositoryMock.setInvoice.restore();
        console.error.restore();
    });

    describe('#getAllOrders', () => {
        it('should call repository\'s getAllOrders function', async () => {
            await orderController.getAllOrders(request, response);
            expect(orderRepositoryMock.getAllOrders.called).to.be.true;
        });
    
        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            await orderController.getAllOrders(request, response);
            let expectedResponse = { success: true, data: orderList };
            expect(response.json.calledWith(expectedResponse)).to.be.true;
        });
    
        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            orderRepositoryMock.getAllOrders.restore();
            sinon.stub(orderRepositoryMock, 'getAllOrders').throws();

            let expectedResponse = { success: false, message: sinon.match.string };
            await orderController.getAllOrders(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse))).to.be.true;
            expect(response.status).to.not.equal(200);
        });
    });

    describe('#getOrdersOfCustomer', () => {
        it('should call repository\'s getOrdersOfCustomer function', async () => {
            await orderController.getOrdersOfCustomer(request, response);
            expect(orderRepositoryMock.getOrdersOfCustomer.called).to.be.true;
        });
    
        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            await orderController.getOrdersOfCustomer(request, response);
            let expectedResponse = { success: true, data: orderList };
            expect(response.json.calledWith(expectedResponse)).to.be.true;
        });
    
        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            orderRepositoryMock.getOrdersOfCustomer.restore();
            sinon.stub(orderRepositoryMock, 'getOrdersOfCustomer').throws();

            let expectedResponse = { success: false, message: sinon.match.string };
            await orderController.getOrdersOfCustomer(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse))).to.be.true;
            expect(response.status).to.not.equal(200);
        });
    });

    describe('#getOrderById', () => {
        it('should call repository\'s getOrderById function with ID from request', async () => {
            request.params.id = orderById.id;
            await orderController.getOrderById(request, response);
            expect(orderRepositoryMock.getOrderById.calledWith(request.params.id)).to.be.true;
        });
    
        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            request.params.id = orderById.id;
            await orderController.getOrderById(request, response);
            let expectedResponse = { success: true, data: orderById };
            expect(response.json.calledWith(expectedResponse)).to.be.true;
        });
    
        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            orderRepositoryMock.getOrderById.restore();
            sinon.stub(orderRepositoryMock, 'getOrderById').throws();

            let expectedResponse = { success: false, message: sinon.match.string };
            await orderController.getOrderById(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse))).to.be.true;
            expect(response.status).to.not.equal(200);
        });
    });

    describe('#assembleOrder', () => {
        it('should call repository\'s assembleOrder function with the given order id', async () => {
            request.params.id = orderById.id;
            await orderController.assembleOrder(request, response);
            expect(orderRepositoryMock.assembleOrder.calledWith(request.params.id)).to.be.true;
        });
    
        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            await orderController.assembleOrder(request, response);
            expect(response.json.calledWith(sinon.match(
                sinon.match.has('success', true)
            ))).to.be.true;
        });
    
        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            orderRepositoryMock.assembleOrder.restore();
            sinon.stub(orderRepositoryMock, 'assembleOrder').throws();

            let expectedResponse = { success: false, message: sinon.match.string };
            await orderController.assembleOrder(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse))).to.be.true;
            expect(response.status).to.not.equal(200);
        });
    });

    describe('#payInvoiceOfOrder', () => {
        it('should call repository\'s payInvoiceOfOrder function with the given order id', async () => {
            request.params.id = orderById.id;
            await orderController.payInvoiceOfOrder(request, response);
            expect(orderRepositoryMock.payInvoiceOfOrder.calledWith(request.params.id)).to.be.true;
        });
    
        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            await orderController.payInvoiceOfOrder(request, response);
            expect(response.json.calledWith(sinon.match(
                sinon.match.has('success', true)
            ))).to.be.true;
        });
    
        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            orderRepositoryMock.payInvoiceOfOrder.restore();
            sinon.stub(orderRepositoryMock, 'payInvoiceOfOrder').throws();

            let expectedResponse = { success: false, message: sinon.match.string };
            await orderController.payInvoiceOfOrder(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse))).to.be.true;
            expect(response.status).to.not.equal(200);
        });
    });

    describe('#organizeInstallation', () => {
        it('should call repository\'s setInstallation function with the given order id', async () => {
            request.params.id = orderById.id;
            request.body = new Installation({
                installationTime: new Date(),
                installer: 'someWorkerId'
            });
            await orderController.organizeInstallation(request, response);
            expect(orderRepositoryMock.setInstallation.calledWith(request.params.id, request.body)).to.be.true;
        });
    
        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            request.params.id = orderById.id;
            request.body = new Installation({
                installationTime: new Date(),
                installer: 'someWorkerId'
            });
            await orderController.organizeInstallation(request, response);
            expect(response.json.calledWith(sinon.match(
                sinon.match.has('success', true)
            ))).to.be.true;
        });
    
        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            orderRepositoryMock.setInstallation.restore();
            sinon.stub(orderRepositoryMock, 'setInstallation').throws();

            let expectedResponse = { success: false, message: sinon.match.string };
            await orderController.organizeInstallation(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse))).to.be.true;
            expect(response.status).to.not.equal(200);
        });
    });

    describe('#organizeInstallation', () => {
        it('should call repository\'s setInvoice function with the given order id', async () => {
            request.params.id = orderById.id;
            request.body = new Invoice({ totalPrice: 400, invoicePaid: false });
            await orderController.createInvoice(request, response);

            expect(orderRepositoryMock.setInvoice.calledWith(request.params.id, request.body)).to.be.true;
        });
    
        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            request.params.id = orderById.id;
            request.body = new Invoice({ totalPrice: 400, invoicePaid: false });
            await orderController.createInvoice(request, response);
            
            expect(response.json.calledWith(sinon.match(
                sinon.match.has('success', true)
            ))).to.be.true;
        });
    
        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            orderRepositoryMock.setInvoice.restore();
            sinon.stub(orderRepositoryMock, 'setInvoice').throws();

            let expectedResponse = { success: false, message: sinon.match.string };
            await orderController.createInvoice(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse))).to.be.true;
            expect(response.status).to.not.equal(200);
        });
    });
});