const repository = require('../repositories/employee.repository');

const getAllEmployees = () => {
    return repository.getAllEmployees();
};

const getEmployeeById = (id) => {
    return repository.getEmployeeById(id);
};

module.exports = {
    getAllEmployees,
    getEmployeeById
};