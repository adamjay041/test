import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import CardFilm from './CardFilm'


const MOVIE = gql `
  {
    movies {
      _id,
      title,
      overview,
      poster_path,
      popularity
    },
    tvseries {
      _id,
      title,
      overview,
      poster_path,
      popularity
    }
  }
`

export default function MovieCard () {
  const {loading, error, data} = useQuery(MOVIE)
  console.log(error)

  if(loading) return (<p>...loading</p>)
  if(error) return (<p>{error}</p>)

  return (
    <CardFilm film={data}/>
  )
}