
// const Token = "aca4635f4bc1decff97ff6e9998d6b5f3a5def00"
export class API {

    static getMovies(Token){
        return fetch("http://127.0.0.1:8000/api/movies/",{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Token ${Token}`
                }
            })
            .then( resp => resp.json())
        }
    
    static updateMovie(movie,body,Token){
        return fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${Token}`
            },
            body: JSON.stringify(body)
        })
    }

    static CreateMovie(body,Token){
            return fetch(`http://127.0.0.1:8000/api/movies/`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${Token}`
                },
                body: JSON.stringify(body)
            })
        }
    
    static deleteMovie(movie,Token){
        return fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${Token}`
            }
        })
    }

    static LoginApiCall(body){
        return fetch('http://127.0.0.1:8000/auth/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp=>resp.json())
    }

    static RegisterApiCall(body){
        return fetch('http://127.0.0.1:8000/api/user/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp=>resp.json())
    }
}
