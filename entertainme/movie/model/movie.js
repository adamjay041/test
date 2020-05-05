const mongoogse = require('mongoose')

const MovieSchema = new mongoogse.Schema({
  title: {
    type: 'String',
  },
  overview: {
    type: 'String'
  },
  poster_path: {
    type: 'String'
  },
  popularity: {
    type: 'number'
  },
  tags: {
    type: 'Array'
  }
})

const Movie = mongoogse.model('movie', MovieSchema)

module.exports =  Movie