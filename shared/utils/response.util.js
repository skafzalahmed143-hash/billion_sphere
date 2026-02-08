const httpStatus = require('../constants/httpStatus');

/**
 * Send a success response
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {any} data - Data to send
 * @param {number} statusCode - HTTP status code (default: 200)
 */
exports.sendSuccess = (res, message, data = null, statusCode = httpStatus.OK) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {any} error - Error details or object
 * @param {number} statusCode - HTTP status code (default: 500)
 */
exports.sendError = (res, message, error = null, statusCode = httpStatus.INTERNAL_SERVER_ERROR) => {
    // In production, you might want to mask the actual error object or log it differently
    return res.status(statusCode).json({
        success: false,
        message,
        error: error instanceof Error ? error.message : error,
    });
};
