import React from "react";
import { useState,useEffect } from "react";
import { API } from "./api-service";
import { useCookies } from "react-cookie";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Auth = () =>{

    const [Username,setUsername] = useState("");
    const [Password,setPassword] = useState("");
    const [Token,setToken] = useCookies(['mr-token']);
    const [IsLoginView,setIsLoginView] = useState(true)
    const [storedUsername,setStoredUsername] = useCookies(['username'])
    const [errorMessage,setErrorMessage] = useState(null)


    useEffect(() =>{
        console.log(Token);
        if(Token['mr-token']) window.location.href ='/app';
    },[Token])

    useEffect(()=>{
        setUsername(Username);
        setPassword(Password);
    },[Username,Password])
    
    useEffect(() => {
        if (errorMessage && errorMessage["username"]){
          if(errorMessage["username"][0].length>1)
            alert(errorMessage["username"][0]);
        }
      }, [errorMessage]);

    const ClickedRegister = () => evt =>{
        API.RegisterApiCall({
            "username": Username,
            "password": Password
        })
        .then(error => setErrorMessage(error))
    }
    const ClickedLogin = () => evt =>{
        API.LoginApiCall({
            "username": Username,
            "password": Password
        })
        .then(resp => {if(resp.token) setToken('mr-token',resp.token)})
        .catch(error => console.log(error))
        setStoredUsername('username',Username)
    }

    const IsDisabled = Username.length ===0 || Password.length===0;
    return (
        <div className="App">
            <header className="App-header">
                <h1><FontAwesomeIcon icon={faFilm} />Movie Rater</h1>
                {IsLoginView?(<h2>Login</h2>):(<h2>Register</h2>)}
            </header>
            <div className="login-container">
                <label  htmlFor="Username">Username</label> <br/>
                <input name="Username" placeholder="Username" type="text" id = "Psername" onChange={evt => setUsername(evt.target.value)}/><br/>
                <label htmlFor="Password">Password</label><br/>
                <input name="Password" placeholder="Password" type="password" id = "Password" onChange={evt => setPassword(evt.target.value)}/><br/><br/>
                {IsLoginView?(<div>
                                <button name="submit" type="submit" disabled={IsDisabled} onClick={ClickedLogin()}>Login</button>
                                <p>Not Registered till now?, Please click here,
                                    <a onClick={()=>{setIsLoginView(false);}} href="#">Register</a>
                                </p>
                            </div>):
                            (<div>
                                <button name="submit" type="submit" disabled={IsDisabled} onClick={ClickedRegister()}>Register</button>
                                <p>Already Registered?, Please click here,
                                    <a onClick={()=>{setIsLoginView(true);}} href="#">Login</a>
                                </p>
                            </div>)}
            </div>
        </div>
    )
}

export default Auth;