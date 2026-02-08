const express = require('express');
const router = express.Router();
const MarketiqonController = require('../controllers/marketiqon.controller');

router.get('/ads', MarketiqonController.getAds);

module.exports = router;
