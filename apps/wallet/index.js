const { createApp } = require('../../shared/appUtils');
const walletRoutes = require('./routes/wallet.routes');

const PORT = process.env.WALLET_PORT || 3002;

createApp('Wallet', PORT, [
    { path: '/api/wallet', router: walletRoutes }
]);
