const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.BUYLA_PORT || 3004;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const buylaRoutes = require('./routes/buyla.routes');
app.use('/api/buyla', buylaRoutes);

app.listen(PORT, () => {
    console.log(`Buyla Service running on port ${PORT}`);
});
