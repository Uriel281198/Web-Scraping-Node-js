const express = require('express');
const api = express.Router();
const { getData } = require('../animeScrap')
const { getDataCovid } = require('../covidScrap')



api.get('/animes',getData)
api.get('/covid',getDataCovid)

module.exports = api