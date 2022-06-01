const mongoose = require('mongoose');
const { Schema } = mongoose;


const trendSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        required: true
    }

});

const Trend = mongoose.model('Trend', trendSchema);

module.exports = Trend;