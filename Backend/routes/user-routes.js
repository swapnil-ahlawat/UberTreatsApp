const express = require('express');
const userController = require('../controllers/user-controllers');

const userRouter = express.Router();

userRouter.post('/placeOrder', userController.placeOrder);

module.exports = userRouter;