const express = require('express');
const packageController = require('../controllers/package-controllers');

const packageRouter = express.Router();

packageRouter.post('/scanPackage', packageController.scanPackage);
packageRouter.post('/addPackage', packageController.addPackage);

module.exports = packageRouter;