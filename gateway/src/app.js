const express = require('express');
const proxy = require('express-http-proxy');

const { APP_DEFINITIONS } = require('../../shared/src/apps');
const { MESSAGES } = require('../../shared/src/messages');
const { sendError, sendSuccess } = require('../../shared/src/responses');
const { HTTP_STATUS } = require('../../shared/src/status-codes');

require('../../shared/src/env');

const app = express();
const PORT = process.env.PORT || 3000;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://127.0.0.1:4001';
const ADMIN_SERVICE_URL = process.env.ADMIN_SERVICE_URL || 'http://127.0.0.1:5000';

app.use(express.json());

const buildProxyOptions = (proxyReqPathResolver) => ({
  proxyReqPathResolver,
  proxyErrorHandler: (err, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    const details = err?.code || err?.message || 'Upstream connection failed';
    return sendError(
      res,
      'Upstream service unavailable',
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      details
    );
  }
});

app.get('/health', (_req, res) => {
  return sendSuccess(
    res,
    MESSAGES.COMMON.HEALTHY,
    {
      service: 'gateway'
    },
    HTTP_STATUS.OK
  );
});

app.use(
  '/api/auth',
  proxy(
    AUTH_SERVICE_URL,
    buildProxyOptions((req) => {
      if (req.url === '/health' || req.url === '/health/') return '/health';
      return `/auth${req.url}`;
    })
  )
);

app.use(
  '/api/admin',
  proxy(
    ADMIN_SERVICE_URL,
    buildProxyOptions((req) => {
      if (req.url === '/health' || req.url === '/health/') return '/health';
      return `/admin${req.url}`;
    })
  )
);

APP_DEFINITIONS.forEach((appConfig) => {
  const envKey = `${appConfig.key.toUpperCase()}_SERVICE_URL`;
  const serviceUrl =
    process.env[envKey] || `http://127.0.0.1:${appConfig.defaultPort}`;

  app.use(
    `/api/apps/${appConfig.key}`,
    proxy(
      serviceUrl,
      buildProxyOptions((req) => `/${appConfig.key}${req.url}`)
    )
  );
});

app.use((_req, res) => {
  return sendError(res, MESSAGES.COMMON.ROUTE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
