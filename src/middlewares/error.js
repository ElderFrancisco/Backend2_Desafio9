const EErrors = require('../services/errors/enums');

module.exports = (error, req, res, next) => {
  console.log('running');
  console.log(error.cause);

  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      return res.status(400).send({
        status: 'error',
        error: error.name,
        cause: error.cause,
      });
    case EErrors.DATABASE_ERROR:
      return res.status(404).send({
        status: 'error',
        error: error.name,
        cause: error.cause,
      });

    default:
      return res
        .status(500)
        .send({ status: 'error', error: 'unhandled error' });
  }
};
