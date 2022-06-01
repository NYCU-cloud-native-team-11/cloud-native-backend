const express = require('express');
const router = express.Router();
const trends = require('../controllers/trends');

router.get('/', trends.get);

router.get('/keywords/:company', trends.get_params);

module.exports = router;