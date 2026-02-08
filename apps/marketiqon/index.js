const { createApp } = require('../../shared/appUtils');
const marketiqonRoutes = require('./routes/marketiqon.routes');

const PORT = process.env.MARKETIQON_PORT || 3003;

createApp('Marketiqon', PORT, [
    { path: '/api/marketiqon', router: marketiqonRoutes }
]);
