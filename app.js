const express = require('express');
const standRouter = require('./src/routes/StandRouter');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/stand', standRouter);

module.exports = app;