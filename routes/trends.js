const express = require('express');
const router = express.Router();
const trends = require('../controllers/trends');
const { body, validationResult } = require('express-validator');

router.get('/', trends.get);

router.get('/keywords/:company', trends.get_params);

router.post(
    '/',
    body('company').isString().isLength({ min: 1 }),
    body('count').isInt({ min: 0 }),
    body('date').isDate(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    trends.post
);

module.exports = router;