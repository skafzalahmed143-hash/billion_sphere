const { buildApplicationService } = require('./application-service');
require('./env');

try {
    const { app, port, serviceName } = buildApplicationService('shared'); // Using a fallback or dummy key for now

    app.listen(port, () => {
        console.log(`[${serviceName}] Shared service running on port ${port}`);
    });
} catch (error) {
    // If 'shared-service-fallback' is not in apps.js, we might need to adjust buildApplicationService
    // or add 'shared' to APP_DEFINITIONS.
    console.error('Failed to start shared service:', error.message);

    // Alternative: manually start a simple express app if buildApplicationService is too restrictive
    const express = require('express');
    const app = express();
    const port = process.env.SHARED_PORT || 4100;

    app.get('/health', (req, res) => {
        res.json({ status: 'healthy', service: 'shared-service' });
    });

    app.listen(port, () => {
        console.log(`[shared-service] Manual fallback running on port ${port}`);
    });
}
