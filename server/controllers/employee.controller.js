const handlers = require('./shared/response.handlers');
const { Employee } = require('../models/Employee');

const service = require('../services/employee.service');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await service.getAllEmployees();
        const result = handlers.sanitize(Employee, employees);
        handlers.sendSuccessResponse(res, result);
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await service.getEmployeeById(req.params.id);
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