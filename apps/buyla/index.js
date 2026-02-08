const { createApp } = require('../../shared/appUtils');
const buylaRoutes = require('./routes/buyla.routes');

const PORT = process.env.BUYLA_PORT || 3004;

createApp('Buyla', PORT, [
    { path: '/api/buyla', router: buylaRoutes }
]);
