const express = require('express');
const { validateEnv } = require('../../shared/src/env');
const { MESSAGES } = require('../../shared/src/messages');
const { sendError, sendSuccess } = require('../../shared/src/responses');
const { HTTP_STATUS } = require('../../shared/src/status-codes');

validateEnv(['ADMIN_EMAIL', 'ADMIN_PASSWORD'], 'Admin Panel');

const app = express();
const PORT = process.env.PORT || 5000;
const SERVICE_NAME = process.env.SERVICE_NAME || 'admin-panel';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

app.use(express.json());

app.get('/health', (_req, res) => {
  return sendSuccess(
    res,
    MESSAGES.COMMON.HEALTHY,
    {
      service: SERVICE_NAME
    },
    HTTP_STATUS.OK
  );
});

app.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(
        res,
        MESSAGES.AUTH.EMAIL_PASSWORD_REQUIRED,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return sendError(res, MESSAGES.ADMIN.LOGIN_FAILED, HTTP_STATUS.UNAUTHORIZED);
    }

    return sendSuccess(res, MESSAGES.ADMIN.LOGIN_SUCCESS, {
      admin: {
        email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return sendError(
      res,
      MESSAGES.ADMIN.LOGIN_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
});

app.use((_req, res) => {
  return sendError(res, MESSAGES.COMMON.ROUTE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
});

app.listen(PORT, () => {
  console.log(`Admin panel running on port ${PORT}`);
});
