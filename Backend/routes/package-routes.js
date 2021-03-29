const express = require('express');
const packageController = require('../controllers/package-controllers');

const packageRouter = express.Router();

packageRouter.post('/scanPackage', packageController.scanPackage);
packageRouter.post('/addPackage', packageController.addPackage);
packageRouter.post('/sendPackage', packageController.sendPackage);

module.exports = packageRouter;