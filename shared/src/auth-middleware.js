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

const authenticateDefault = (req, res, next) => {
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

    if (process.env.MASTER_TOKEN && token === process.env.MASTER_TOKEN) {
      req.user = { id: 'master', roles: [1] };
      return next();
    }

    return sendError(
      res,
      MESSAGES.COMMON.STATIC_TOKEN_INVALID,
      HTTP_STATUS.UNAUTHORIZED
    );
  } catch (error) {
    return sendError(
      res,
      'Authentication Failed',
      HTTP_STATUS.UNAUTHORIZED,
      error.message
    );
  }
};

module.exports = {
  authenticateJwt,
  authenticateDefault
};
