const express = require('express');
const api = express.Router();
const { getData } = require('../covidScrap')



api.get('/covid',getData)


module.exports = api