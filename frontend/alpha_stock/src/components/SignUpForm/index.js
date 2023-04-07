import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import xMark from "../../assets/iconmonstr-x-mark-1.svg"
import "./AuthForm.css"
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import GithubLogo from "../../assets/github-logo.png"
import LinkedInLogo from "../../assets/linkedin.png"

export default function SignUpForm({type}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(true)
  const [username, setUsername] = useState("")
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const navigate = useNavigate()
  const textCredentials = {"first_name":"First Name", "last_name":"Last Name", "email": "Email", "password": "Password"}

  useEffect(() => {
    let tag = document.getElementById("login-modal-content")
    if(tag){
      let i = 100
      const slideIn = setInterval(() => {
        let newVal = `${i}vh`
      
        tag.style.marginTop = newVal
        i -= 1
        if(newVal === "20vh"){
          clearInterval(slideIn)
        }
      },1)

  
    }

  },[])

  // if (sessionUser) return <Redirect to="/listings" />;


  const handleSignUp = (e) => {
    e.preventDefault();

      setErrors([]);
      let reqParams = {
        "email":credential,
        "password":password,
        "last_name": last_name,
        "first_name" : first_name,
        "username":username
      }
      let missingParams = Object.keys(reqParams).filter(key => reqParams[key] === '').map(key => `Please add a valid ${textCredentials[key]}`)
      if(credential.length < 6) missingParams.push("Password must have 6 or more characters")
      setErrors(missingParams)
      if(missingParams.length > 0){
        return null
      }else{
        dispatch(sessionActions.signup(reqParams))
        navigate("/profile")
    }
      
  };

  const handleDemoLogin = () => {
    setErrors([]);
    dispatch(sessionActions.login({ credential: "test@gmail.com", password: "password" }))
    navigate("/profile")
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  const toggleModal = () => {
    setShow(false)
    navigate("/login")
  }
  if(sessionUser === null && show === true){
  return (
    <>
    
  <div id="login-modal">
    <div id="login-modal-background">
      <div id="signup-modal-content">
        <div id="login-modal-header">
          {/* <div id="close-modal-button-container" onClick={toggleModal}>
            <img width="20px" heigh="20px" alt="" src={xMark}></img>
          </div> */}
          <div id="login-banner">Sign Up</div>
     
        </div>
        <br></br>
      <div id="login-form-container">
        <div id="auth-errors-container">
          <ul>
            {errors.map(err => <li style={{"color":"red"}}>{err}</li>)}
          </ul>
          <br></br>
        <form onSubmit={(e) => handleSignUp(e)}>
        {type !== "login" ? 
          <>
          <div id="login-input-container" >
          <label className="login-input-hidden-label" id="first-name-label"></label>
          <input className="login-input-field" type="text" placeholder='First Name' id="firstName"  value={first_name} onChange={(e) => setFirstName(e.target.value)}></input>
        </div>
        <div id="login-input-container" >
          <label className="login-input-hidden-label" id="last-name-label"> </label>
          <input className="input-field" id="lastName" type="text"onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' value={last_name}   ></input>
        </div>
        <br></br>
        </>
              : null  
        }

          <div id="login-input-container" >
            <label className="login-input-hidden-label" id="email-label"></label>
            <input className="login-input-field" type="email" placeholder='Email' id="email"  value={credential} onChange={(e) => setCredential(e.target.value)}></input>
          </div>
          <div id="login-input-container" >
            <label className="login-input-hidden-label" id="username-label"></label>
            <input className="login-input-field" type="text" placeholder='username' id="username"  value={username} onChange={(e) => setUsername(e.target.value)}></input>
          </div>
          <div id="login-input-container" >
            <label className="login-input-hidden-label" id="password-label"> </label>
            <input className="input-field" id="Password" type="password"onChange={(e) => setPassword(e.target.value)} placeholder='Password' value={password}   ></input>
          </div>
          <br></br>

          <div id="login-submit-container">
            <button id="login-submit-button">
              <span>Continue</span>
            </button>
          </div>
        </form>
        </div>
        <br></br>
        <div id="change-auth-container">
           <div> Already a member ?</div>
           <br></br>
           <div id="login-submit-container">
            <button id="login-submit-button">
              <span><NavLink style={{"color":"white" ,"text-decoration":"none"}} to="/login">Go to Login</NavLink></span>
                
            </button>
          </div>
        </div>
        <br></br>
        <div id="login-submit-container" >
            <button id="login-submit-button" onClick={handleDemoLogin}>
              <span>Demo Login</span>
            </button>
          </div>

        <br></br>
        <br></br>
        <div id="login-submit-container">
            <button id="social-media-auth-link" style={{"background-color":"white", "border":"1px solid black"}}>
            <div><img width="30px" height="30px" src={GithubLogo}></img></div>
              <div>
                <a style={{"color":"black" ,"text-decoration":"none" , "margin-left":"50px", "text-align":"center", "font-size":"20px", "padding-top":"10px"}} href="https://github.com/michael-aman01/MyBNB_Project/wiki">@michael-aman01</a>
              </div>
            </button>
            <button  id="social-media-auth-link" style={{"border":"1px solid blue", "background-color":"white"}} >
            <div><img width="30px" height="30px" src={LinkedInLogo}></img></div>
              <div>
                <a style={{"color":"#0072b1","text-decoration":"none" , "margin-left":"50px", "text-align":"center", "font-size":"20px", "padding-top":"10px"}} href="https://www.linkedin.com/in/michael-aman-ba1086258/">Michael Aman</a>
              </div>
            </button>
          </div>
      </div>
      </div>
    </div>  
    </div>
    </>
  );
  }
}