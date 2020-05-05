const express = require('express').Router()
const router = express
const movie = require('./Movie')

router.use(movie)

module.exports = router