const Trend = require('../models/trend');
const sub = require('date-fns/sub')

module.exports.get = async (req, res) => {
    const trends = await Trend.find({});
    res.json(trends);
}

module.exports.get_params = async (req, res) => {
    var trends = await Trend.find({ company: req.params.company }).exec();
    res.json(trends);
}

//  query 特定公司過去 24 小時的趨勢 
module.exports.get_24_hours = async (req, res) => {
    const now_date = (new Date(+new Date() + 8 * 3600 * 1000));
    const last_date = (sub(now_date, {
        hours: 24,
    }));
    var trends = await Trend.find({
        company: req.params.company,
        date:
        {
            $lte: now_date,
            $gte: last_date
        }
    })
    res.json(trends);
}

module.exports.post = async (req, res) => {
    const trends = req.body;
    const { company, count, date } = req.body;
    const trend = new Trend({ company, count, date });
    await trend.save();
    res.sendStatus(200);
}

module.exports.post_many = async (req, res) => {
    const trends = req.body;
    trend_list = []
    for (const t of trends) {
        const trend = new Trend(t);
        trend_list.push(trend);

    }
    await Trend.insertMany(trend_list);
    res.sendStatus(200);
}