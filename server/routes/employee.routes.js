const express = require('express');
const router = express.Router();

const controller = require('../controllers/employee.controller');

router.get('/', controller.getAllEmployees);
router.get('/:id', controller.getEmployeeById);

module.exports = router;