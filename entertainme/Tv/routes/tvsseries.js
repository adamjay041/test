const express = require('express').Router()
const router = express
const ControllerTvseries = require('../controller/tvSeries')

router.post('/TvSeries', ControllerTvseries.add)
router.get('/TvSeries', ControllerTvseries.findAll)
router.delete('/TvSeries/:id',ControllerTvseries.deleteTvSeries)
router.get('/TvSeries/:id',ControllerTvseries.findOne)
router.patch('/TvSeries/:id',ControllerTvseries.updateTvSeries)

module.exports = router