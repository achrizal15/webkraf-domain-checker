const express = require('express');
const router = express.Router();

// Import Controller
const domain = require('../controller/domain.js');

// Definisikan rute-rute API
router.get('/domain', domain.checkDomain);

module.exports = router;
