const { verifyToken } = require('./jwt');
const { MESSAGES } = require('./messages');
const { sendError } = require('./responses');
const { HTTP_STATUS } = require('./status-codes');

const authenticateJwt = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return sendError(
        res,
        MESSAGES.COMMON.TOKEN_REQUIRED,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    if (!token) {
      return sendError(
        res,
        MESSAGES.COMMON.TOKEN_REQUIRED,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const decoded = verifyToken(token, process.env.JWT_SECRET || 'supersecretkey');
    req.user = decoded;
    return next();
  } catch (error) {
    return sendError(
      res,
      MESSAGES.COMMON.INVALID_TOKEN,
      HTTP_STATUS.UNAUTHORIZED,
      error.message
    );
  }
};

module.exports = {
  authenticateJwt
};
