const express = require('express');
const puppeter = require('puppeteer');
const animeRoutes = require('./routes/animes')

const cors = require('cors')

const app = express();

app.use(cors())

app.use('/v1',animeRoutes)


module.exports = app;



