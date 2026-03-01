const { HTTP_STATUS } = require('./status-codes');

const sendSuccess = (res, message, data = {}, statusCode = HTTP_STATUS.OK) => {
  return res.status(statusCode).json({
    status: 1,
    message,
    data
  });
};

const sendError = (
  res,
  message,
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  data = []
) => {
  return res.status(statusCode).json({
    status: 0,
    message,
    data
  });
};

module.exports = {
  sendSuccess,
  sendError
};
