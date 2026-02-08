const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/users', authController.fetchUsers);

module.exports = router;
