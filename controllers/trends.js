const Trend = require('../models/trend');

module.exports.get = async (req, res) => {
    const trends = await Trend.find({});
    res.json(trends);
}