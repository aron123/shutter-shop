const handlers = require('./shared/response.handlers');
const { Employee } = require('../models/Employee');

const repository = require('../repositories/employee.repository');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await repository.getAllEmployees();
        const result = handlers.sanitize(Employee, employees);
        handlers.sendSuccessResponse(res, result);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await repository.getEmployeeById(req.params.id);
        const result = handlers.sanitize(Employee, employee);
        handlers.sendSuccessResponse(res, result);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

module.exports = {
    getAllEmployees,
    getEmployeeById
};