const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const createApp = (serviceName, port, routes = []) => {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());

    // Default route
    app.get('/', (req, res) => {
        res.send(`${serviceName} Service is running`);
    });

    // Register routes
    routes.forEach(route => {
        app.use(route.path, route.router);
    });

    app.listen(port, () => {
        console.log(`${serviceName} Service running on port ${port}`);
    });

    return app;
};

module.exports = { createApp };
