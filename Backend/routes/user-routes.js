const express = require('express');
const userController = require('../controllers/user-controllers');

const userRouter = express.Router();

userRouter.post('/placeOrder', userController.placeOrder);
userRouter.get('/restaurant', userController.getOrders);
userRouter.post('/removeOrder', userController.removeOrder);

module.exports = userRouter;