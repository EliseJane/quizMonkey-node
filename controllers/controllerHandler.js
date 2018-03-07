const ApiError = require('../helpers/apiError');
const logger = require('../log');
const controllerHandler = (promise, params) => (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  promise(...boundParams)
  .then( result => (res.status(200).json(result || { message: 'OK' })))
  .catch(error => (next(Object.prototype.isPrototypeOf.call(ApiError.prototype, error) ? error : new ApiError(error))))
};

module.exports = controllerHandler;
