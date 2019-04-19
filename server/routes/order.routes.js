const express = require('express');
const router = express.Router();

const controller = require('../controllers/order.controller');

router.get('/', controller.getAllOrders);
router.get('/:id', controller.getOrderById);
router.get('/customer/:id', controller.getOrdersOfCustomer);
router.post('/', controller.addOrder);
router.post('/:id/assemble', controller.assembleOrder);
router.post('/:id/pay', controller.payInvoiceOfOrder);
router.post('/:id/installation', controller.organizeInstallation);
router.post('/:id/invoice', controller.createInvoice);

module.exports = router;