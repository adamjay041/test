const  {ApolloServer, gql} = require('apollo-server')
const Redis = require('ioredis')
const redis = new Redis()
const axios =require('axios')

const typeDefs = gql`
type Movie {
  _id: ID,
  title: String,
  overview: String,
  poster_path: String,
  popularity: Float,
  tags: [String]
}

type tvSeries {
  _id: ID,
  title: String,
  overview: String,
  poster_path: String,
  popularity: Float,
  tags: [String]
}

type Query {
  movies:[Movie]
  tvseries:[tvSeries]
}

type Mutation {
  addMovie
  (
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  ): Movie
  addTvSeries
  (
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  ): tvSeries
  updateMovie
  (
    _id: ID
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  ): Movie
  updateTvSeries
  (
    _id: ID
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  ): tvSeries
  deleteMovie
  (
    _id: ID
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  ): Movie
  deleteTvSeries
  (
    _id: ID
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  ): tvSeries
}
`

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const result = await redis.get('movies')
        if(result) {
          return JSON.parse(result)
        } else {
          const  { data } = await axios.get('http://localhost:3001/Movie')
          console.log(data)
          const _ = await redis.set('movies', JSON.stringify(data))
          return data
        }
      } catch {
        throw new Error
      }
    },
    tvseries: async () => {
      try {
        const result = await redis.get('tvseries')
        if(result) {
          return JSON.parse(result)
        } else {
          const  { data } = await axios.get('http://localhost:3002/TvSeries')
          console.log(data)
          const _ = await redis.set('tvseries',JSON.stringify(data))
          return data
        }
      } catch (error) {
        
      }
    }
  },
  Mutation: {
    addMovie: async (_, input) => {
      console.log(input)
      try {
        const { data } = await axios.post('http://localhost:3001/Movie', input)
        const _ = await redis.del('movies')
        return data
      } catch {
        throw new Error
      }
    },
    addTvSeries: async (_, input) => {
      try {
        const {data} = await axios.post('http://localhost:3002/TvSeries', input)
        const _ = await redis.del('tvseries')
        return data
      } catch {
        
      }
    },
    updateMovie: async (_, input) => {
      try {
        const {data} = await axios.patch('http://localhost:3001/Movie/'+input._id, input)
        const _ = await redis.del('movies')
        return data
      } catch {
        throw new Error
      }
    },
    updateTvSeries: async (_, input) => {
      try {
        const {data} = await axios.put('http:/localhost:3002/TvSeries/'+input._id, input)
        const _ = await redis.del('tvseries')
        return data
      } catch {
        throw new Error
      }
    },
    deleteMovie: async (_, input) => {
      try {
        const __ = await axios.delete('http://localhost:3001/Movie/'+input._id)
        const _ = redis.del('movies')
        return input
      } catch {
        throw new Error
      }
    },
    deleteTvSeries: async (_,input) => {
      try {
        const __ = await axios.delete('http://localhost:3002/TvSeries/'+input._id)
        const _ = await redis.del('tvseries')
        return input
      } catch {
        throw new Error
      }
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({ url }) => console.log('connected' + url))