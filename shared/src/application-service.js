const express = require('express');

const { authenticateJwt } = require('./auth-middleware');
const { APP_DEFINITIONS } = require('./apps');
const { MESSAGES } = require('./messages');
const { sendError, sendSuccess } = require('./responses');
const { HTTP_STATUS } = require('./status-codes');

const APP_LOOKUP = APP_DEFINITIONS.reduce((acc, appConfig) => {
  acc[appConfig.key] = appConfig;
  return acc;
}, {});

const buildApplicationService = (appKey) => {
  const appConfig = APP_LOOKUP[appKey];

  if (!appConfig) {
    throw new Error(`Unsupported application key: ${appKey}`);
  }

  const app = express();
  const serviceName = process.env.SERVICE_NAME || `${appConfig.key}-service`;
  const port = Number(process.env.PORT) || appConfig.defaultPort;

  app.use(express.json());

  app.get('/health', (_req, res) => {
    return sendSuccess(
      res,
      MESSAGES.COMMON.HEALTHY,
      {
        service: serviceName,
        app: appConfig.key
      },
      HTTP_STATUS.OK
    );
  });

  const router = express.Router();

  router.get('/profile', authenticateJwt, (req, res) => {
    return sendSuccess(res, MESSAGES.APPS.PROFILE_SUCCESS, {
      app: appConfig,
      user: req.user
    });
  });

  router.get('/overview', authenticateJwt, (req, res) => {
    return sendSuccess(res, MESSAGES.APPS.OVERVIEW_SUCCESS, {
      app: appConfig,
      user: req.user,
      features: [
        'overview',
        'profile'
      ]
    });
  });

  app.use(`/${appConfig.key}`, router);

  app.use((_req, res) => {
    return sendError(res, MESSAGES.COMMON.ROUTE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  });

  return {
    app,
    appConfig,
    port,
    serviceName
  };
};

module.exports = {
  buildApplicationService
};
