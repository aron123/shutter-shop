const express = require('express');
const router = express.Router();

const controller = require('../controllers/order.controller');

router.get('/', controller.getAllOrders);
router.get('/customer/:id', controller.getOrdersOfCustomer);
router.post('/', controller.addOrder);

module.exports = router;