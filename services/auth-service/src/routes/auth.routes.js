const express = require('express');
const authController = require('../controllers/auth.controller');
const {
  validation: authValidation,
  authMiddleware: { authenticateJwt }
} = require('../../../../shared');

const router = express.Router();

// Auth Routes
router.post('/register', authValidation.register, authController.register);
router.post('/login', authValidation.login, authController.login);
router.post('/refresh-token', authValidation.refreshToken, authController.refreshToken);

// OTP Routes
router.post('/verify-otp', authValidation.verifyOtp, authController.verifyOtp);
router.post('/send-otp', authValidation.sendOtp, authController.sendOtp);

// Forgot Password Routes
router.post('/forgot-password', authValidation.forgotPassword, authController.forgotPassword);
router.post('/reset-password', authValidation.resetPassword, authController.resetPassword);

// Master Data Routes
router.post('/dropdowns', authController.getDropdowns);
router.post('/add-countries', authController.addCountries);

// Profile Route
router.post('/profile', authenticateJwt, authController.getProfile);

module.exports = router;
