const mongoogse = require('mongoose')

const TvSeriesSchema = new mongoogse.Schema({
  title: {
    type: 'string',
  },
  overview: {
    type: 'string'
  },
  poster_path: {
    type: 'string'
  },
  popularity: {
    type: 'number'
  },
  tags: {
    type: 'array'
  }
})

const TvSeries = mongoogse.model('tvSeries', TvSeriesSchema)

module.exports =  TvSeries