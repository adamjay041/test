import React, {useState} from 'react'
import CardMedia from '@material-ui/core/CardMedia';
import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import { makeStyles } from '@material-ui/core/styles';


import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  TextField 
} from '@material-ui/core'
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 200,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const DELETE_MOVIE = gql `
  mutation deleteMovie($_id: ID) {
    deleteMovie (_id: $_id) {
      _id
    }
  } 
`

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

const ADD_MOVIE = gql `
  mutation addMovie($title: String, $poster_path: String, $overview: String, $popularity: Float) {
    addMovie (title: $title, poster_path: $poster_path, overview: $overview, popularity: $popularity) {
      _id,
      title,
      poster_path,
      overview,
      popularity
    }
  }
`

const ADD_TV = gql `
mutation addTvSeries($title: String, $poster_path: String, $overview: String, $popularity: Float) {
  addTvSeries (title: $title, poster_path: $poster_path, overview: $overview, popularity: $popularity) {
    _id,
    title,
    poster_path,
    overview,
    popularity
  }
}
`

const UPDATE_MOVIE = gql `
mutation updateMovie($_id: ID,$title: String, $poster_path: String, $overview: String, $popularity: Float) {
  updateMovie (_id: $_id,title: $title, poster_path: $poster_path, overview: $overview, popularity: $popularity) {
    _id,
    title,
    poster_path,
    overview,
    popularity
  }
}
`


const DELETE_TV = gql `
  mutation deleteTvSeries ($_id: ID) {
    deleteTvSeries (_id: $_id) {
      _id
    }
  }
`

export default function CardFilm ({ film }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const filmMovie = film.movies
  const filmTv = film.tvseries
  const [open,SetOpen] = useState(false)
  const [open2,SetOpen2] = useState(false)
  const [title,SetTitle]= useState('')
  const [poster_path, setPoster] = useState('')
  const [overview, setOverview] = useState('')
  const [popularity, setpopularity] = useState(0)
  const [update, setUpdate] = useState({})
  const [deleted] = useMutation(DELETE_MOVIE,{
    update(cache, {data: {deleteMovie} }) {
      const {movies} = cache.readQuery({query: MOVIE})
      cache.writeQuery({
        query: MOVIE,
        data: {movies: movies.filter(el => el._id !== deleteMovie._id)}
      })
    }
  })
  const [AddMovie] = useMutation(ADD_MOVIE,{
    update(cache, {data: { addMovie } }) {
      const { movies } = cache.readQuery({ query: MOVIE }) 
      cache.writeQuery({
        query: MOVIE,
        data: {movies : movies.concat([addMovie])}
      })
    }
  })
  const [UpdateMovie] = useMutation(UPDATE_MOVIE,{
    update(cache, {data: {updateMovie} }) {
      const { movies } = cache.readQuery({ query: MOVIE })
      cache.writeQuery({
        query: MOVIE,
        data: {movies : movies.concat([updateMovie])}
      })
    }
  })
  const [deleteTv] = useMutation(DELETE_TV, {
    update(cache, {data: {deleteTvSeries }} ) {
      const {tvseries} = cache.readQuery({query: MOVIE})
      cache.writeQuery({
        query: MOVIE,
        data : {tvseries : tvseries.filter(el => el.id !== deleteTvSeries._id)}
      })
    }
  })
  const [AddTv] = useMutation(ADD_TV, {
    update(cache, {data: {addTv}}) {
      const {tvseries} = cache.readQuery({query: MOVIE})
      cache.writeQuery({
        query: MOVIE,
        data: {tvseries: tvseries.concat([addTv])}
      })
    }
  })
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    textAlign: 'center',
    fontFamily: "Arial"
  };
  const styleImg = {
    height: "350px",
  }
  const filmDelete = (e, el) => {
    deleted({variables: {_id: el._id}})
  }
  const tvDelete = (e, el) => {
    console.log(el._id)
    deleteTv({variables: {_id: el._id}})
  }
  const openModal = () => {
    SetOpen(true)
  }
  const handleClose = () => {
    SetOpen(false)
  }

  const addMovie = (event) => {
    event.preventDefault()
    console.log (poster_path)
    let popu = Number(popularity)
    AddMovie({variables: {title:title, poster_path:poster_path, popularity: popu, overview:overview}})
    setpopularity(0)
    setPoster('')
    SetTitle('')
    setOverview('')
  }

  const updateMovie = (event) => {
    event.preventDefault()
    console.log (poster_path)
    let popu = Number(popularity)
    UpdateMovie({variables: {_id:update._id,title:title, poster_path:poster_path, popularity: popu, overview:overview}})
    setpopularity(0)
    setPoster('')
    SetTitle('')
    setOverview('')
  }

  const openUpdate = (_,el) => {
    setUpdate(el)
    SetOpen2(true)
  }

  const handleClose2 = (_, el) => {
    SetOpen2(false)
  }

  const openUpdateTv = (_,el) => {
    setUpdate(el)
    SetOpen2(true)
  }

  const addTv = (event) => {
    event.preventDefault()
    console.log (poster_path)
    let popu = Number(popularity)
    AddTv({variables: {title:title, poster_path:poster_path, popularity: popu, overview:overview}})
    setpopularity(0)
    setPoster('')
    SetTitle('')
    setOverview('')
  }

  const fromsAdd = (
    <form onSubmit={addMovie}>
      <div style={modalStyle} className={classes.paper}>
        <div style={{textAlign: 'center'}}>
          <Typography>Add new Movie</Typography>
        </div>
        <div style={{margin: 10}}>
          <TextField id="title" label="title" onChange={event => SetTitle(event.target.value)}/>
        </div>
        <div style={{margin: 10}}>
          <TextField id="poster_path" label="poster_path" onChange={event => setPoster(event.target.value)} />
        </div>
        <div style={{margin: 10}}>
          <TextField id="overview" label="overview" onChange={event => setOverview(event.target.value)}/>
        </div>
        <div style={{margin: 10}}>
          <TextField id="popularity" label="popularity" type="Number" onChange={event => setpopularity(event.target.value)} />
        </div>
        <input type="submit" value="submit"></input>
      </div>
    </form>
  )

  const fromsUpdate = (
    <form onSubmit={updateMovie}>
      <div style={modalStyle} className={classes.paper}>
        <div style={{textAlign: 'center'}}>
          <Typography>Update Movie</Typography>
        </div>
        <div style={{margin: 10}}>
          <TextField id="title" label="title" onChange={event => SetTitle(event.target.value)} defaultValue={update.title}/>
        </div>
        <div style={{margin: 10}}>
          <TextField id="poster_path" label="poster_path" onChange={event => setPoster(event.target.value)} defaultValue={update.poster_path} />
        </div>
        <div style={{margin: 10}}>
          <TextField id="overview" label="overview" onChange={event => setOverview(event.target.value)} defaultValue={update.overview}/>
        </div>
        <div style={{margin: 10}}>
          <TextField id="popularity" label="popularity" type="Number" onChange={event => setpopularity(event.target.value)} defaultValue={update.popularity}/>
        </div>
        <input type="submit" value="submit"></input>
      </div>
    </form>
  )

  const fromsAddTv = (
    <form onSubmit={addTv}>
      <div style={modalStyle} className={classes.paper}>
        <div style={{textAlign: 'center'}}>
          <Typography>Add new TV series</Typography>
        </div>
        <div style={{margin: 10}}>
          <TextField id="title" label="title" onChange={event => SetTitle(event.target.value)}/>
        </div>
        <div style={{margin: 10}}>
          <TextField id="poster_path" label="poster_path" onChange={event => setPoster(event.target.value)} />
        </div>
        <div style={{margin: 10}}>
          <TextField id="overview" label="overview" onChange={event => setOverview(event.target.value)}/>
        </div>
        <div style={{margin: 10}}>
          <TextField id="popularity" label="popularity" type="Number" onChange={event => setpopularity(event.target.value)} />
        </div>
        <input type="submit" value="submit"></input>
      </div>
    </form>
  )


  return (
    <div>
      <div style={mystyle}>
        <Typography>Movies</Typography>
        <Button onClick={openModal}>Add Movie</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {fromsAddTv}
        </Modal>
      </div>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        text-align="center"
      >
      {filmMovie.map(el => (
      <Grid item xs={12} sm={3} key={el.id}>
          <Card>
            <CardMedia style={styleImg}
            image={el.poster_path}
            >
            </CardMedia>
            <CardContent>
              <Typography style={mystyle} gutterBottom variant="h5" component="h2" >
                  Title: {el.title}
                  <br></br>
                  OverView: {el.overview}
              </Typography>
              <div style={{display:'flex',justifyContent: "space-around", background: 'red'}}>
                <div onClick={event => filmDelete(event, el)}>
                  <Button>delete</Button>
                </div>
                <div>
                  <Button onClick={event => openUpdate(event,el)}>update</Button>
                  <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {fromsUpdate}
                  </Modal>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        ))}
      </Grid>
      <div style={mystyle}>
        <Typography>Tv Series</Typography>
        <Button onClick={openModal}>Add Tv Series</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {fromsAddTv}
        </Modal>
      </div>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        text-align="center"
      >
      {filmTv.map(el => (
      <Grid item xs={12} sm={3} key={el.id}>
          <Card>
            <CardMedia style={styleImg}
            image={el.poster_path}
            >
            </CardMedia>
            <CardContent>
              <Typography style={mystyle} gutterBottom variant="h5" component="h2" >
                  Title: {el.title}
                  <br></br>
                  OverView: {el.overview}
              </Typography>
              <div style={{display:'flex',justifyContent: "space-around", background: 'red'}}>
                <div onClick={event => tvDelete(event, el)}>
                  <Button>delete</Button>
                </div>
                <div>
                <Button onClick={event => openUpdateTv(event,el)}>update</Button>
                  <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                  </Modal>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        ))}
      </Grid>
    </div>
  )
}