const express = require('express');
const router = express.Router();

const controller = require('../controllers/customer.controller');

router.post('/', controller.addCustomer);
router.get('/', controller.getAllCustomers);
router.get('/:id', controller.getCustomerById);

module.exports = router;