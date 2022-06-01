const express = require('express');
const router = express.Router();
const trends = require('../controllers/trends');

router.get('/', trends.get);

module.exports = router;