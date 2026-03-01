const { buildApplicationService } = require('./src/application-service');
const env = require('./src/env');
const apps = require('./src/apps');
const authMiddleware = require('./src/auth-middleware');
const jwt = require('./src/jwt');
const messages = require('./src/messages');
const responses = require('./src/responses');
const statusCodes = require('./src/status-codes');
const validation = require('./src/validation');

module.exports = {
    buildApplicationService,
    env,
    apps,
    authMiddleware,
    jwt,
    messages,
    responses,
    statusCodes,
    validation
};

// If this file is run directly (e.g. by nodemon or node index.js in shared root)
if (require.main === module) {
    require('./src/index.js');
}
