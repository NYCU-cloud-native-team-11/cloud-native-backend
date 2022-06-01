// Load dotenv config
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const trendRoutes = require('./routes/trends');

// App setting
app.use(express.json());

// Connect to MongoDB
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/trends';

const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(dbUrl, opts, err => {
        if (err) {
            console.error(err);
        }
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Database connected");
    });
}


// Routes

app.use('/api/trends', trendRoutes)

app.all('*', (req, res, next) => {
    res.sendStatus(404);
})

app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
})

module.exports = app;