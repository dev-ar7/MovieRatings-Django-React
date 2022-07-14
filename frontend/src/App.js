import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSignOut } from '@fortawesome/free-solid-svg-icons';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieEdit from './components/MovieEdit';
import { Button, Dimmer, Loader, Message, Segment } from 'semantic-ui-react';
import './App.css';
import { useCookies } from 'react-cookie';
import { useFetch } from './hooks/useFetch';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [token, setToken, removeToken] = useCookies(['Mr-Cookie']);
  const [data, loading, error] = useFetch();

  useEffect(() => {
    setMovies(data);
  }, [data])

  useEffect( () => {
    console.log(token)
    if( !token['Mr-Cookie'] | token['Mr-Cookie'] === undefined) {
      console.log('not there')
      window.location.href = '/';
    } else {
      console.log('exists')
    }
  }, [token]) 

  const updateMovie = movie => {
    setSelectedMovie(movie);
    setEditMovie(null);
  }

  const editClicked = movie => {
    setEditMovie(movie);
    setSelectedMovie(null);
  }

  const trashClicked = movie => {
    const latestMovie = movies.filter( mov => {
      if (mov.id === movie.id) {
        return false;
      }
      return true;
    })
    setMovies(latestMovie);
  }

  const updatedMovie = movie => {
    const latestMovie = movies.map( mov => {
      if (mov.id === movie.id) {
        return movie
      }
      return mov;
    })
    setMovies(latestMovie);
  }

  const newMovie = () => {
    setEditMovie({title: '', description: ''});
    setSelectedMovie(null);
  }

  const createdMovie = movie => {
    const latestMovie = [...movies, movie];
    setMovies(latestMovie);
  }

  const logoutUser = () => {
    removeToken('Mr-Cookie');
  }

  if (loading) return (
    <Segment>
      <Dimmer active>
        <Loader size='huge'>Loading</Loader>
      </Dimmer>
    </Segment>
  );

  if (error) return (
    <Message negative>
      <Message.Header>Something Went Wrong!</Message.Header>
      <p>{error}</p>
    </Message>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1><FontAwesomeIcon icon={faFilm} />Movie Ratings</h1>
      </header>
      <FontAwesomeIcon icon={faSignOut} onClick={logoutUser} />
      <div className='layout'>
        <div className='movielist'>
          <MovieList 
            movies = {movies}
            onClick = {updateMovie}
            editClicked={editClicked}
            trashClicked={trashClicked}
          />
          <Button className='addB' color='green' onClick={newMovie}>Add New</Button>
        </div>
        <MovieDetails 
          movie = {selectedMovie}
          updateMovie={updateMovie}
        />
        { editMovie ? 
          <MovieEdit movie = {editMovie} onClick = {editClicked} 
            updatedMovie={updatedMovie}
            createdMovie={createdMovie}
          /> 
        : null}
      </div>
    </div>
  );
}

export default App;
