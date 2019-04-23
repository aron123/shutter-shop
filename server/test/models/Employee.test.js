const chai = require('chai');
const expect = chai.expect;

const { Employee } = require('../../models/Employee');
const ModelValidationError = require('../../models/errors/ModelValidationError');

describe('server/models/Employee.js', () => {
    let employeeData;
    let employee;

    beforeEach(() => {
        employeeData = {
            id: 1,
            level: 'WORKER',
            name: 'Ferenc Kovacs',
            mobile: '06301237654'
        };
        employee = new Employee(employeeData); 
    });

    it('should set all fields properly if input is valid', () => {
        expect(employee).to.deep.equal(employeeData);
    });

    it('should throw ModelValidationError if no employee name is given', () => {
        delete employeeData.name;
        expect(() => new Employee(employeeData)).to.throw(ModelValidationError, /name/);
    });

    it('should throw ModelValidationError if no employee level is given', () => {
        delete employeeData.level;
        expect(() => new Employee(employeeData)).to.throw(ModelValidationError, /level/);
    });

    it('should throw ModelValidationError if employee level is not WORKER or MANAGER', () => {
        employeeData.level = 'POINTLESS';
        expect(() => new Employee(employeeData)).to.throw(ModelValidationError, /level/);
    });
});