const { HTTP_STATUS } = require('./status-codes');

const sendSuccess = (res, message, data = {}, statusCode = HTTP_STATUS.OK, status = 1) => {
  return res.status(statusCode).json({
    status,
    message,
    data
  });
};

const sendError = (
  res,
  message,
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  data = [],
  status = 0
) => {
  return res.status(statusCode).json({
    status,
    message,
    data
  });
};

module.exports = {
  sendSuccess,
  sendError
};
