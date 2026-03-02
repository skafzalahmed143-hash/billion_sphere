const { sendSuccess, sendError } = require('../../../../shared/src/responses');
const { HTTP_STATUS } = require('../../../../shared/src/status-codes');
const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);

    if (result.status === 1) {
      return sendSuccess(res, result.message, result.data, HTTP_STATUS.OK);
    }

    return sendError(res, result.message, HTTP_STATUS.BAD_REQUEST);

  } catch (error) {
    console.error('Register Controller Error:', error);
    return sendError(res, 'Internal Server Error', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    if (result.status === 1) {
      return sendSuccess(res, result.message, result.data, HTTP_STATUS.OK, result.status);
    }

    if (result.message === 'Account not verified. OTP sent.') {
      return sendSuccess(res, result.message, result.data, HTTP_STATUS.OK, 0);
    }

    return sendError(res, result.message, HTTP_STATUS.UNAUTHORIZED);

  } catch (error) {
    console.error('Login Controller Error:', error);
    return sendError(res, 'Internal Server Error', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const getProfile = async (req, res) => {
  try {
    const result = await authService.getProfile(req.user.id);
    if (result.status === 1) {
      return sendSuccess(res, result.message, result.data, HTTP_STATUS.OK);
    }

    return sendError(res, result.message, HTTP_STATUS.NOT_FOUND);
  } catch (error) {
    console.error('Get Profile Controller Error:', error);
    return sendError(res, 'Internal Server Error', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const result = await authService.verifyOtp(req.body);
    if (result.status === 1) {
      return sendSuccess(res, result.message, result.data, HTTP_STATUS.OK);
    }
    return sendError(res, result.message, HTTP_STATUS.BAD_REQUEST);
  } catch (error) {
    console.error('Verify OTP Controller Error:', error);
    return sendError(res, 'Internal Server Error', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const resendOtp = async (req, res) => {
  try {
    const result = await authService.resendOtp(req.body);
    if (result.status === 1) {
      return sendSuccess(res, result.message, result.data, HTTP_STATUS.OK);
    }
    return sendError(res, result.message, HTTP_STATUS.BAD_REQUEST);
  } catch (error) {
    console.error('Resend OTP Controller Error:', error);
    return sendError(res, 'Internal Server Error', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.body);
    if (result.status === 1) {
      return sendSuccess(res, result.message, result.data, HTTP_STATUS.OK);
    }
    return sendError(res, result.message, HTTP_STATUS.BAD_REQUEST);
  } catch (error) {
    console.error('Forgot Password Controller Error:', error);
    return sendError(res, 'Internal Server Error', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const resetPassword = async (req, res) => {
  try {
    const result = await authService.resetPassword(req.body);
    if (result.status === 1) {
      return sendSuccess(res, result.message, result.data, HTTP_STATUS.OK);
    }
    return sendError(res, result.message, HTTP_STATUS.BAD_REQUEST);
  } catch (error) {
    console.error('Reset Password Controller Error:', error);
    return sendError(res, 'Internal Server Error', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const refreshToken = async (req, res) => {
  try {
    const result = await authService.refreshToken(req.body);
    if (result.status === 1) {
      return sendSuccess(res, result.message, result.data, HTTP_STATUS.OK);
    }
    return sendError(res, result.message, HTTP_STATUS.BAD_REQUEST);
  } catch (error) {
    console.error('Refresh Token Controller Error:', error);
    return sendError(res, 'Internal Server Error', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const getDropdowns = async (req, res) => {
  try {
    const { type } = req.body;
    const result = await authService.getDropdowns(type);
    if (result.status === 1) {
      return sendSuccess(res, result.message, result.data, HTTP_STATUS.OK);
    }
    return sendError(res, result.message, HTTP_STATUS.BAD_REQUEST);
  } catch (error) {
    console.error('Get Dropdowns Controller Error:', error);
    return sendError(res, 'Internal Server Error', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const addCountries = async (req, res) => {
  try {
    const result = await authService.addCountries();
    if (result.status === 1) {
      return sendSuccess(res, result.message, result.data, HTTP_STATUS.OK);
    }
    return sendError(res, result.message, HTTP_STATUS.BAD_REQUEST);
  } catch (error) {
    console.error('Add Countries Controller Error:', error);
    return sendError(res, 'Internal Server Error', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  refreshToken,
  getDropdowns,
  addCountries
};
