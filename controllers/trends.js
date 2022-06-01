const Trend = require('../models/trend');

module.exports.get = async (req, res) => {
    const trends = await Trend.find({});
    res.json(trends);
}

module.exports.get_params = async (req, res) => {
    var trends = await Trend.find({ company: req.params.company }).exec();
    res.json(trends);
}