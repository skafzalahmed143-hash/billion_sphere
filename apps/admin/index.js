const { createApp } = require('../../shared/appUtils');

const PORT = process.env.ADMIN_PORT || 3005;

createApp('Admin', PORT);
