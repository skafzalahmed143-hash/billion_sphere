require('../../../shared/src/env');

const express = require('express');

const { sequelize } = require('../../../shared/database');
const authRoutes = require('./routes/auth.routes');
const { MESSAGES } = require('../../../shared/src/messages');
const { sendError, sendSuccess } = require('../../../shared/src/responses');
const { HTTP_STATUS } = require('../../../shared/src/status-codes');

const app = express();
const PORT = process.env.PORT || 4001;
const SERVICE_NAME = process.env.SERVICE_NAME || 'auth-service';
let isDatabaseConnected = false;

app.use(express.json());

app.get('/health', (_req, res) => {
  return sendSuccess(
    res,
    MESSAGES.COMMON.HEALTHY,
    {
      service: SERVICE_NAME,
      databaseConnected: isDatabaseConnected
    },
    HTTP_STATUS.OK
  );
});

app.use('/auth', authRoutes);

app.use((_req, res) => {
  return sendError(res, MESSAGES.COMMON.ROUTE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
});

const startServer = async () => {
  try {
    console.log('Auth service initiating database connection check...');
    await sequelize.authenticate();
    isDatabaseConnected = true;

    console.log('Auth service database connected');
  } catch (error) {
    console.warn(
      `Auth service database unavailable. Starting in fallback mode: ${error.message}`
    );
  }

  console.log(`Auth service attempting to listen on port ${PORT}...`);
  app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
  });
};

startServer();
