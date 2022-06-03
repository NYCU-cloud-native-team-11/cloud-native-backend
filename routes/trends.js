const express = require('express');
const router = express.Router();
const trends = require('../controllers/trends');
const { body, validationResult } = require('express-validator');

router.get('/', trends.get);

router.get('/keywords/:company', trends.get_params);

router.get('/keywords/:company/last_24_hours', trends.get_24_hours);

router.get('/keywords/:company/last_7_days', trends.get_7_days);

router.get('/keywords/:company/last_30_days', trends.get_30_days);


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

router.post(
    '/post_many',
    body().isArray(),
    body('*.company').isString().isLength({ min: 1 }),
    body('*.count').isInt({ min: 0 }),
    body('*.date').isDate(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    trends.post_many
);




module.exports = router;