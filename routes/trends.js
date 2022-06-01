const express = require('express');
const router = express.Router();
const trends = require('../controllers/trends');

router.get('/', (req, res) => {
    res.sendStatus(404);
})

module.exports = router;