import React,{useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from "react-cookie";

function MovieDetails(props){
    const mov =  props.movie
    const [highlighted,setHighlighted] = useState(-1);
    const [Token] = useCookies(['mr-token'])

    const highlightedRate = high =>evt =>{
        setHighlighted(high)
    }   
    const rateClicked = rate => evt =>{
        console.log(rate);
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`,{
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Token ${Token['mr-token']}`
            },
            body: JSON.stringify({ stars: rate })
        })
        .then(() => getDetails())
        .catch(error =>console.log(error));
    }


    const getDetails = () =>{
        
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
    
    return (
        <React.Fragment>
            { mov? (
            <div className = "movie-details">
                <h1>{mov.title}</h1>
                <p className="movie-description">{mov.description}</p>
                <div>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_ratings>0?"orange":""}/> 
                    <FontAwesomeIcon icon={faStar} className={mov.avg_ratings>1?"orange":""} /> 
                    <FontAwesomeIcon icon={faStar} className={mov.avg_ratings>2?"orange":""} /> 
                    <FontAwesomeIcon icon={faStar} className={mov.avg_ratings>3?"orange":""} /> 
                    <FontAwesomeIcon icon={faStar} className={mov.avg_ratings>4?"orange":""} />
                    ({mov.avg_ratings})
                </div>
                <div className="rate-container">
                    <h2>Rate this movie</h2>
                    {[...Array(5)].map( (e,i) => {                
                        return <FontAwesomeIcon key={i} icon={faStar} className={(highlighted>i-1?"purple":"")} 
                                onMouseEnter={highlightedRate(i)} 
                                onMouseLeave={highlightedRate(-1)}
                                onClick={rateClicked(i+1)}
                                />
                    })}
                </div>
            </div>
            ) :
            null }
        </React.Fragment>
    )
}

export default MovieDetails;