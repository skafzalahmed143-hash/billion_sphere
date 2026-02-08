const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgand');
require('dotenv').config();

const app = express();
const PORT = process.env.ADMIN_PORT || 3005;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Admin Service is running');
});

app.listen(PORT, () => {
    console.log(`Admin Service running on port ${PORT}`);
});
