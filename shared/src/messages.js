const MESSAGES = Object.freeze({
  COMMON: {
    HEALTHY: 'Service is running',
    ROUTE_NOT_FOUND: 'Route not found',
    INTERNAL_ERROR: 'Internal server error',
    TOKEN_REQUIRED: 'Authorization token is required',
    INVALID_TOKEN: 'Invalid or expired token',
    STATIC_TOKEN_INVALID: 'Invalid token',
    VALIDATION_ERROR: 'Validation error'
  },
  AUTH: {
    EMAIL_PASSWORD_REQUIRED: 'Email and password are required',
    USER_EXISTS: 'User already exists',
    REGISTER_SUCCESS: 'User registered successfully',
    LOGIN_SUCCESS: 'Login successful',
    LOGIN_FAILED: 'Invalid email or password',
    REGISTER_FAILED: 'Unable to register user',
    LOGIN_ERROR: 'Unable to login'
  },
  ADMIN: {
    LOGIN_SUCCESS: 'Admin login successful',
    LOGIN_FAILED: 'Invalid admin credentials',
    LOGIN_ERROR: 'Unable to login admin'
  },
  APPS: {
    PROFILE_SUCCESS: 'Profile fetched successfully',
    OVERVIEW_SUCCESS: 'Application overview fetched successfully'
  }
});

module.exports = {
  MESSAGES
};
