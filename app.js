const express = require('express');
const app = express();


// App setting
app.use(express.json());


app.all('*', (req, res, next) => {
    res.sendStatus(404);
})

app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
})

module.exports = app;