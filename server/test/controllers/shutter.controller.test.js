const sinon = require('sinon');
const { mockReq, mockRes } = require('sinon-express-mock');
const { expect } = require('chai');

const { Shutter } = require('../../models/Shutter');

describe('server/controllers/shutter.controller.js', () => {
    
    let shutterById;
    let shutterList;

    let request;
    let response;

    let databaseMock;
    let shutterRepositoryMock;
    let shutterController;

    beforeEach(() => {
        shutterById = new Shutter({
            name: 'Bermuda ABS Shutter',
            material: 'METAL',
            parts: [
                { name: 'rail', pieces: 5 },
                { name: 'stile', pieces: 7 }
            ]
        });

        shutterList = [ shutterById ];

        // disable console.error
        sinon.stub(console, 'error');

        // mock database connector
        databaseMock = require('../../utils/database');
        sinon.stub(databaseMock, 'getDatabase').returns({ collection: () => null });

        // mock repository
        shutterRepositoryMock = require('../../repositories/shutter.repository');
        sinon.stub(shutterRepositoryMock, 'getShutterById').returns(shutterById);
        sinon.stub(shutterRepositoryMock, 'getAllShutters').returns(shutterList);

        // mock express req, res
        request = mockReq();
        response = mockRes();

        // require controller
        shutterController = require('../../controllers/shutter.controller');
    });

    afterEach(() => {
        databaseMock.getDatabase.restore();
        shutterRepositoryMock.getShutterById.restore();
        shutterRepositoryMock.getAllShutters.restore();
        console.error.restore();
    })

    describe('#getAllShutters', () => {
        it('should call repository\'s getAllShutters function', async () => {
            await shutterController.getAllShutters(request, response);
            expect(shutterRepositoryMock.getAllShutters.called).to.be.true;
        });

        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            let expectedResponse = { success: true, data: shutterList };

            await shutterController.getAllShutters(request, response);
            expect(response.json.calledWith(expectedResponse)).to.be.true;
        });

        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            shutterRepositoryMock.getAllShutters.restore();
            sinon.stub(shutterRepositoryMock, 'getAllShutters').throws();

            let expectedResponse = { success: false, message: sinon.match.string };

            await shutterController.getAllShutters(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse)));
            expect(response.status).to.not.equal(200);
        });
    });

    describe('#getShutterById', () => {
        it('should call repository\'s getShutterById function with ID from request', async () => {
            request.params.id = shutterById.id;
            await shutterController.getShutterById(request, response);

            expect(shutterRepositoryMock.getShutterById.calledWith(shutterById.id)).to.be.true;
        });

        it('should send response in (success = true, data = result) format and 200 HTTP code on success', async () => {
            let expectedResponse = { success: true, data: shutterById };

            await shutterController.getShutterById(request, response);
            expect(response.json.calledWith(expectedResponse)).to.be.true;
        });

        it('should set success to false in response, and HTTP status other than 200 on failure', async () => {
            shutterRepositoryMock.getShutterById.restore();
            sinon.stub(shutterRepositoryMock, 'getShutterById').throws();

            let expectedResponse = { success: false, message: sinon.match.string };

            await shutterController.getShutterById(request, response);
            expect(response.json.calledWith(sinon.match(expectedResponse)));
            expect(response.status).to.not.equal(200);
        });
    });
});