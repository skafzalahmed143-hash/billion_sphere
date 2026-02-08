const express = require('express');
const router = express.Router();
const BuylaController = require('../controllers/buyla.controller');

router.get('/products', BuylaController.getProducts);

module.exports = router;
