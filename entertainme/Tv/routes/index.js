const express = require('express').Router()
const router = express
const tv =require('./tvsseries')

router.use(tv)

module.exports = router