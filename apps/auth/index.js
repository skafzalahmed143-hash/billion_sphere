const { createApp } = require('../../shared/appUtils');
const authRoutes = require('./routes/auth.routes');

const PORT = process.env.AUTH_PORT || 3001;

createApp('Auth', PORT, [
    { path: '/api/auth', router: authRoutes }
]);
