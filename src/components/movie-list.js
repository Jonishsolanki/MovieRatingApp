import React from "react";
import { faEdit,faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API } from "./api-service";
import { useCookies } from "react-cookie";

function MovieList(props){

    const [Token] = useCookies(['mr-token'])

    const movieClicked = movie => evt =>{
        props.movieClicked(movie)
    }

    const editClicked = movie => evt =>{
        props.editClicked(movie)
    }

    const deleteClicked = movie => evt =>{
        API.deleteMovie(movie,Token['mr-token'])
        .then(()=>getMovieDetails())
        .catch(error => console.log(error))
    }



    const getMovieDetails=()=>{
        return (
            fetch(`http://127.0.0.1:8000/api/movies/`,{
                method:"GET",
                headers:{
                'Content-Type':'application/json',
                'Authorization': `Token ${Token['mr-token']}`
                }
            })
            .then( resp => resp.json())
            .then( resp => props.updatedMovieList(resp))
            .catch( error => console.log(error))
        )
    }

    return (
        <div>
            {props.movies ? 
                props.movies.map(movie => {
                    return (
                        <div key={movie.id} className="movieItem">
                            <h3 onClick={movieClicked(movie)}>{movie.title}</h3>
                            <FontAwesomeIcon icon={faEdit} onClick={editClicked(movie)}/>
                            <FontAwesomeIcon icon={faTrash} onClick={deleteClicked(movie)}/>
                        </div>
                    )}): "No movies are added to this site!"}
        </div>
    )
};

export default MovieList;