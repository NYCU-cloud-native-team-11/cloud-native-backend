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
    const now_date = (new Date(+new Date()));
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

//  query 特定公司過去 7 天的趨勢 
module.exports.get_7_days = async (req, res) => {
    const now_date = (new Date(+new Date()));
    const last_date = (sub(now_date, {
        days: 7,
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

//  query 特定公司過去 30 天的趨勢 
module.exports.get_30_days = async (req, res) => {
    const now_date = (new Date(+new Date()));
    const last_date = (sub(now_date, {
        days: 30,
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

function parse(str) {
    if (!/^(\d){8}$/.test(str)) return "invalid date";
    var y = str.substr(0, 4),
        m = str.substr(4, 2),
        d = str.substr(6, 2);
    return new Date(+new Date(y, m - 1, d));
}

//  query 特定公司特定日期間的趨勢 
module.exports.get_specify_date = async (req, res) => {
    const start_date = parse(req.params.start_date);
    const end_date = parse(req.params.end_date);
    var trends = await Trend.find({
        company: req.params.company,
        date:
        {
            $lte: end_date,
            $gte: start_date
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