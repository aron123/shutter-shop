const sinon = require('sinon');
const { mockReq, mockRes } = require('sinon-express-mock');
const { expect } = require('chai');

const { Employee } = require('../../models/Employee');

describe('server/controllers/employee.controller.js', () => {
    
    let employeeById;
    let employeeList;

    let request;
    let response;

    let databaseMock;
    let employeeRepositoryMock;
    let employeeController;

    beforeEach(() => {
        employeeById = new Employee({
            id: '1',
            name: 'Geza Toth',
            level: 'WORKER',
            mobile: '06205556667'
        });

        employeeList = [ employeeById ];

        // disable console.error
        sinon.stub(console, 'error');

        // mock database connector
        databaseMock = require('../../utils/database');
        sinon.stub(databaseMock, 'getDatabase').returns({ collection: () => null });

        // mock repository
        employeeRepositoryMock = require('../../repositories/employee.repository');
        sinon.stub(employeeRepositoryMock, 'getEmployeeById').returns(employeeById);
        sinon.stub(employeeRepositoryMock, 'getAllEmployees').returns(employeeList);

        // mock express req, res
        request = mockReq();
        response = mockRes();

        // require controller
        employeeController = require('../../controllers/employee.controller');
    });

    afterEach(() => {
        databaseMock.getDatabase.restore();
        employeeRepositoryMock.getEmployeeById.restore();
        employeeRepositoryMock.getAllEmployees.restore();
        console.error.restore();
    })

    describe('#getAllEmployees', () => {
        it('should call repository\'s getAllEmployees function', async () => {
            await employeeController.getAllEmployees(request, response);
            expect(employeeRepositoryMock.getAllEmployees.called).to.be.true;
        });

        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            let expectedResponse = { success: true, data: employeeList };

            await employeeController.getAllEmployees(request, response);
            expect(response.json.calledWith(expectedResponse)).to.be.true;
        });

        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            employeeRepositoryMock.getAllEmployees.restore();
            sinon.stub(employeeRepositoryMock, 'getAllEmployees').throws();

            let expectedResponse = { success: false, message: sinon.match.string };

            await employeeController.getAllEmployees(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse)));
            expect(response.status).to.not.equal(200);
        });
    });

    describe('#getEmployeeById', () => {
        it('should call repository\'s getEmployeeById function with ID from request', async () => {
            request.params.id = employeeById.id;
            await employeeController.getEmployeeById(request, response);

            expect(employeeRepositoryMock.getEmployeeById.calledWith(employeeById.id)).to.be.true;
        });

        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            let expectedResponse = { success: true, data: employeeById };

            await employeeController.getEmployeeById(request, response);
            expect(response.json.calledWith(expectedResponse)).to.be.true;
        });

        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            employeeRepositoryMock.getEmployeeById.restore();
            sinon.stub(employeeRepositoryMock, 'getEmployeeById').throws();

            let expectedResponse = { success: false, message: sinon.match.string };

            await employeeController.getEmployeeById(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse)));
            expect(response.status).to.not.equal(200);
        });
    });
});