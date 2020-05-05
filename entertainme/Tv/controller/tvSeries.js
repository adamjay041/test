
const TvSeries = require('../model/Tv_series')

class TvSeriesController {
  static add (req,res,next) {
    TvSeries.create({
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }
  static findAll (req,res,next) {
    TvSeries.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteTvSeries (req,res,next) {
    TvSeries.findByIdAndDelete(req.params.id)
      .then(_ => {
        res.status(200).json({
          message: 'delete success'
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static updateTvSeries (req,res,next) {
    TvSeries.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }
  static findOne (req,res,next) {
    TvSeries.findOne(req.params.id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err =>  {
        next(err)
      })
  }
}

module.exports = TvSeriesController