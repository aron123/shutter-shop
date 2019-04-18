const ModelValidationError = require('./errors/ModelValidationError');

class Employee {
    constructor (employee) {
        if (employee.level !== 'WORKER' && employee.level !== 'MANAGER') {
            throw new ModelValidationError(
                `Invalid employee level, expected 'WORKER' or 'MANAGER', got: ${employee.level}`
            );
        }

        this.id = String(employee.id || employee._id);
        this.level = String(employee.level);
        this.name = String(employee.name);
        this.mobile = String(employee.mobile);
    }
}

module.exports = Employee;