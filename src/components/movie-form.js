import React, { useState,useEffect } from "react";
import { API } from "./api-service";
import { useCookies } from "react-cookie";

function MovieForm(props){

    const [Token] = useCookies(['mr-token'])
    const mov = props.movie
    // console.log(mov)
    // console.log(mov.title,mov.description)
    const [title,setTitle] = useState(mov.title)
    const [description,setDescription] = useState(mov.description)
    
    useEffect(() => {
        setTitle(mov.title)
        setDescription(mov.description)
      }, [props.movie])

    const clickedSetMovieDetails = movieDetail => evt =>{
        // props.clickedSetMovieDetails()
        console.log("submit clicked");
        console.log(mov)
        if(mov.id){
            API.updateMovie(mov,{"title": title,"description":description},Token['mr-token'])
            .then(()=>getDetails())
            .catch(err => console.log(err))
        }
        else{
            API.CreateMovie({"title": title,"description":description},Token['mr-token'])
            .then(()=>getDetails())
            .catch(err => console.log(err))
        }
    }
    
    const getDetails = () =>{
        if(mov.id){
            console.log("get movie details has been called!")
            fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/`,{
                    method:"GET",
                    headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Token ${Token['mr-token']}`
                    }
                })
                .then( resp => resp.json())
                .then( resp => props.updateMovie(resp))
                .catch( error => console.log(error));
        }
        else{
            console.log("get movie details has been called!")
            fetch(`http://127.0.0.1:8000/api/movies/`,{
                    method:"GET",
                    headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Token ${Token['mr-token']}`
                    }
                })
                .then( resp => resp.json())
                .then( resp => props.updatedMovieList(resp))
                .catch( error => console.log(error));
        }
    }

    return (
        <React.Fragment>
            {mov?
            (   <div className="movie-form">
                    <label  htmlFor="title">Title</label> <br/>
                    <input name="title" placeholder="Title" type="text" id = "title" value={title} onChange={evt => setTitle(evt.target.value)}/><br/>
                    <label htmlFor="description">Description</label><br/>
                    <textarea name="description" placeholder="Description" type="text" id = "description" value={description} onChange={evt => setDescription(evt.target.value)}/><br/>
                    { mov.id ?
                        <button name="submit" type="submit" id="MovieSubmitButton" onClick={clickedSetMovieDetails()}>Update</button>:
                        <button name="submit" type="submit" id="MovieSubmitButton" onClick={clickedSetMovieDetails()}>Create</button>
                    }
                </div>
            ):
            null}
        </React.Fragment>
    )
}

export default MovieForm;