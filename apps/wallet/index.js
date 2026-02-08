const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.WALLET_PORT || 3002;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const walletRoutes = require('./routes/wallet.routes');
app.use('/api/wallet', walletRoutes);

app.listen(PORT, () => {
    console.log(`Wallet Service running on port ${PORT}`);
});
