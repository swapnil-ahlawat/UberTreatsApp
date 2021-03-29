const express = require('express');
const userController = require('../controllers/user-controllers');
const userRouter = express.Router();

userRouter.post('/placeOrder', userController.placeOrder);
userRouter.get('/getOrders', userController.getOrders);
userRouter.post('/removeOrder', userController.removeOrder);
userRouter.post('/addWalletMoney', userController.addWalletMoney);
userRouter.post('/givePromoReward', userController.givePromoReward);

module.exports = userRouter;
