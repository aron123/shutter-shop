const express = require('express');
const router = express.Router();

const controller = require('../controllers/shutter.controller');

router.get('/', controller.getAllShutters);
router.get('/:id', controller.getShutterById);

module.exports = router;
