const express = require('express');

const orderController = require('../controllers/order-controllers');
const orderRouter = express.Router();

orderRouter.post('/', orderController.removeOrder);

module.exports = orderRouter;