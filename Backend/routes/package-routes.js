const express = require('express');
const packageController = require('../controllers/package-controllers');

const packageRouter = express.Router();

packageRouter.post('/', packageController.changeTagPackage);

module.exports = packageRouter;