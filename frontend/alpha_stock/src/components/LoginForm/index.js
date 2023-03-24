import {login, register} from "../../store/session"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import "./LoginForm.css"
import GithubLogo from "../../assets/github-logo.png"
import LinkedInLogo from "../../assets/linkedin.png"

export default function LoginForm(){
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    // const currentUser = dispatch(getCurrentUser())
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const loginInfo = {
            password: password,
            email: email
        }
        const res = dispatch(login(loginInfo))
        navigate("/profile")
        
    }

    const handleDemoLogin = (e) => {

    }
    return (
        <>
        <div id="login-modal">
            <div id="login-modal-background">

            <div id="login-modal-content">
                <div id="login-form-container">
                <div id="login-modal-header">

          <div id="login-banner">Login</div>
     
        </div>
        <br></br>
        <div id="login-form-container">
        <div>
          <ul>
            {errors.map(err => <li>{err}</li>)}
          </ul>
                <form onSubmit={handleSubmit}>
          <div id="login-input-container" >
            <label className="login-input-hidden-label" id="email-label"></label>
            <input className="login-input-field" type="email" placeholder='Email' id="email"  value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </div>
          <div id="login-input-container" >
            <label className="login-input-hidden-label" id="password-label"> </label>
            <input className="input-field" id="password" type="password"onChange={(e) => setPassword(e.target.value)} placeholder='password' value={password}   ></input>
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
        <div id="login-submit-container" >
            <button id="login-submit-button" onClick={handleDemoLogin}>
              <span>Demo Login</span>
            </button>
          </div>
        <br></br>
        <div id="change-auth-container">
           <div> Not a member ?</div>
           <br></br>
           <div id="login-submit-container">
            <button id="login-submit-button">
              <span><NavLink style={{"color":"white" ,"text-decoration":"none"}} to="/signup">Sign Up</NavLink></span>
                
            </button>
          </div>
          <div id="login-submit-container">
            <button id="social-media-auth-link" style={{"background-color":"white", "border":"1px solid black"}}>
            <div><img width="30px" height="30px" src={GithubLogo}></img></div>
              <div>
                <a style={{"color":"black" ,"text-decoration":"none" , "margin-left":"50px", "text-align":"center", "font-size":"20px", "padding-top":"10px"}} href="https://github.com/michael-aman01/MyBNB_Project/wiki" target="_blank">@michael-aman01</a>
              </div>
            </button>
            <button  id="social-media-auth-link" style={{"border":"1px solid blue", "background-color":"white"}} >
            <div><img width="30px" height="30px" src={LinkedInLogo}></img></div>
              <div>
                <a style={{"color":"#0072b1","text-decoration":"none" , "margin-left":"50px", "text-align":"center", "font-size":"20px", "padding-top":"10px"}} href="https://www.linkedin.com/in/michael-aman-ba1086258/"  target="_blank">Michael Aman</a>
              </div>
            </button>
          </div>
        </div>

        </div>
        <br></br>
        <br></br>
        </div>
        </div>
        </div>
        </div>
  
        </>
    )
    
}