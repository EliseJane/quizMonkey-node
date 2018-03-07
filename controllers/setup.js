const controllerHandler = require('./controllerHandler');
const express = require('express');
const router = express.Router();
const Setup = require('../models/setup');

router.get('/', controllerHandler(Setup.init, (req, res, next) => [req.query.clear]));

module.exports = router;
