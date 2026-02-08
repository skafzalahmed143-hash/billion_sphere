const express = require('express');
const router = express.Router();
const WalletController = require('../controllers/wallet.controller');

router.get('/', WalletController.getWalletDetails);

module.exports = router;
