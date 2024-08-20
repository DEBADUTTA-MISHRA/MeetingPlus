const successResponse = (req, res, data, message, statusCode) => {
  return res.status(statusCode).send({
      error: false,
      success: true,
      message: message,
      data
  });
};

const failResponse = (req, res, data, message, statusCode) => {
  return res.status(statusCode).send({
      error: false,
      success: false,
      message: message,
      data
  });
};

const errorResponse = (req, res, errorDesc, errorKey) => {
  const statusCode = errorKey ? errorKey : 500;
  return res.status(statusCode).send({
      error: true,
      success: false,
      message: errorDesc.message || 'Something went wrong',
      data: null
  });
};

module.exports = {
  errorResponse,
  failResponse,
  successResponse
};
