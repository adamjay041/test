
const movie = require('../model/movie')

class MovieController {
  static add (req,res,next) {
    movie.create({
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
    movie.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteMovie (req,res,next) {
    movie.findByIdAndDelete(req.params.id)
      .then(_ => {
        res.status(200).json({
          message: 'delete success'
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static updateMovie (req,res,next) {
    movie.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      overview: req.body.overview,
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
    movie.findOne(req.params.id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err =>  {
        next(err)
      })
  }
}

module.exports = MovieController