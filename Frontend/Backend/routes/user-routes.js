const express = require('express');
const userController = require('../controllers/user-controllers');

const userRouter = express.Router();

userRouter.get('/', userController.userDetails);

module.exports = userRouter;