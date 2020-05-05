const express = require('express').Router()
const router = express
const ControllerMovie = require('../controller/addMovie')

router.post('/Movie', ControllerMovie.add)
router.get('/Movie', ControllerMovie.findAll)
router.delete('/Movie/:id',ControllerMovie.deleteMovie)
router.get('/Movie/:id',ControllerMovie.findOne)
router.patch('/Movie/:id',ControllerMovie.updateMovie)

module.exports = router