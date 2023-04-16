import './App.css';
import React,{ useState,useEffect } from 'react'
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';
import { faFilm,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFetch from './hooks/useFetch';

function App() {

  // const [movies, setMovie] = useState(["Don","My name is khanna!"]);
  const [Token,setToken,deleteToken] = useCookies(['mr-token'])
  const [movies,setMovies] = useState([]);
  const [selectedMovie,setSelectedMovie] = useState(null)
  const [editMovie,setEditMovie] = useState(null)
  // const [deleteMovie,SetDeleteMovie] = useState(null)
  const [data,loading,error] = useFetch();
  const [username,setUsername,deleteUsername] = useCookies(['username'])

  useEffect(() => {
      setMovies(data);

      // fetch("http://127.0.0.1:8000/api/movies/",{
      //   method:"GET",
      //   headers:{
      //     'Content-Type':'application/json',
      //     'Authorization': `Token ${Token['mr-token']}`
      //   }
      // })
      // .then( resp => resp.json())
      // .then( resp => setMovies(resp))
      // .catch( error => console.log(error))
  },[data])

  useEffect(()=>{
    if(!Token['mr-token']) window.location.href = '/';
  },[Token])

  // const movieClicked = movie => {
  //   setEditMovie(null);
  //   setSelectedMovie(movie);
    
  //   // console.log(movie.title)
  // }
  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditMovie(null)
  }

  const editClicked = movie => {
    setSelectedMovie(null);
    setEditMovie(movie);
    // console.log(movie)
  }

  // const deleteClicked = movie => {
  //   SetDeleteMovie(movie)
  // }

  const updateMovie = movie => {
    const newMovies = movies.map(mov => {
      if(mov.id===movie.id){
        return movie;
      }
      return mov;
    })
    setMovies(newMovies)
  }

  const AddMovie = () =>{
    setEditMovie({title:'',description:''});
    setSelectedMovie(null);
  }

  const NewMovie = movies =>{
    setMovies(movies);
    setSelectedMovie(null);
    setEditMovie(null);
  }

  // const AddNewMovie = movie =>{
  //   const newMovies = [...movies,movie];
  //   setMovies(newMovies)
  // }
  const logoutUser = () =>{
    deleteToken(['mr-token']);
    deleteUsername(['username'])
  }
  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error while loading a Movies!</h1>
  return (
    <div className="App">
      <header className="App-header">
      <h1><FontAwesomeIcon icon={faFilm} />Movie Rater</h1>
      <h3 className='username'>{username['username']}</h3>
      <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} />
        <div className="layout">
          <div>
            <MovieList movies={movies} movieClicked = {loadMovie} editClicked={editClicked} updatedMovieList = {NewMovie}/>
            <button className='addMovieButton' id='addMovieButton' onClick={AddMovie}>Add new movie...</button>
          </div>
          <MovieDetails movie={selectedMovie} updateMovie = {loadMovie}/>
          { editMovie? <MovieForm movie={editMovie} updateMovie ={updateMovie} updatedMovieList = {NewMovie}/>:null }
        </div>
      </header>
    </div>
  );
}

export default App;
