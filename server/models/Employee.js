const ModelValidationError = require('./errors/ModelValidationError');

class Employee {
    constructor (employee) {
        
        validateEmployee(employee);

        this.id = employee.id || employee._id;
        this.level = String(employee.level);
        this.name = String(employee.name);
        this.mobile = employee.mobile ? String(employee.mobile) : employee.mobile;
    }
}

function validateEmployee (employee) {
    if (!employee.level || employee.level !== 'WORKER' && employee.level !== 'MANAGER') {
        throw new ModelValidationError(
            `Invalid employee level, expected 'WORKER' or 'MANAGER', got: ${employee.level}`
        );
    }

    if (!employee.name) {
        throw new ModelValidationError(`No name given for employee, got: ${employee.name}`);
    }
}

module.exports = {
    Employee
};