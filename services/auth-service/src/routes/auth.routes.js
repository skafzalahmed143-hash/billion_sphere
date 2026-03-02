const express = require('express');
const authController = require('../controllers/auth.controller');
const {
  validation: authValidation,
  authMiddleware: { authenticateJwt, authenticateDefault }
} = require('../../../../shared');

const router = express.Router();

// Auth Routes
router.post('/register', authenticateDefault, authValidation.register, authController.register);
router.post('/login', authenticateDefault, authValidation.login, authController.login);
router.post('/refresh-token', authenticateDefault, authValidation.refreshToken, authController.refreshToken);

// OTP Routes
router.post('/verify-otp', authenticateDefault, authValidation.verifyOtp, authController.verifyOtp);
router.post('/resend-otp', authenticateDefault, authValidation.resendOtp, authController.resendOtp);

// Forgot Password Routes
router.post('/forgot-password', authenticateDefault, authValidation.forgotPassword, authController.forgotPassword);
router.post('/reset-password', authenticateDefault, authValidation.resetPassword, authController.resetPassword);

// Master Data Routes
router.post('/dropdowns', authenticateDefault, authValidation.getDropdowns, authController.getDropdowns);
router.post('/add-countries', authenticateDefault, authController.addCountries);

// Profile Route
router.post('/profile', authenticateJwt, authController.getProfile);

module.exports = router;
