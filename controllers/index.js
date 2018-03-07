const ApiError = require ('../helpers/apiError');
const logger = require('../log');
const express = require('express');
const router = express.Router();
router.use('/setup', require('./setup'));
router.use('/quizzes', require('./quizzes'));
router.use('/questions', require('./questions'));
router.use((err, req, res, next) => {
  if (Object.prototype.isPrototypeOf.call(ApiError.prototype, err)) {
    return res.status(err.status).json({ error: err.message });
  }
  logger.log.error(`Unexpected error exception: ${err}`);
  return res.status(500).json({ error: 'Unexpected Error' });
});

module.exports = router;
