const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.MARKETIQON_PORT || 3003;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const marketiqonRoutes = require('./routes/marketiqon.routes');
app.use('/api/marketiqon', marketiqonRoutes);

app.listen(PORT, () => {
    console.log(`Marketiqon Service running on port ${PORT}`);
});
