import { compose } from "redux";


const LOGIN_USER = "session/LOGIN_USER"
const LOGOUT_USER = "session/LOGOUT_USER"

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
  }




  export function storeCSRFToken(token) {

    if (token) sessionStorage.setItem("X-CSRF-Token", token);
  }
  
  export async function restoreCSRF() {
    const response = await fetch("/api/csrf");

    const token = await response.headers.get("X-CSRFToken")
    storeCSRFToken(token)
    return response;
  }

export const loginUser = user  => {
    return (
        {
            type: LOGIN_USER,
            user
        }
    )
}

export const logoutUser = user => {
    return (
        {
            type: LOGOUT_USER,
            user
        }
    )
}

export const test = sym => dispatch => {
    console.log(process.env)
}


export const login = user => async dispatch => {
    if(sessionStorage.getItem("X-CSRF-Token") === null){
        const token = await restoreCSRF()
    }else{
        const token = sessionStorage.getItem("X-CSRF-Token") 
    }
    
    const res = await fetch("/api/session/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
        }
    })

    const data = await res.json()
    if(data){

        const token = await res.headers.get("X-CSRFToken")
        storeCSRFToken(token)
        storeCurrentUser(data)
        dispatch(loginUser({"current_user": data}))
        return data
    }
}


export const logout = user => async dispatch => {
    const res = await fetch("/api/session/logout")
    const data = await res.json()
    if(data){
        console.log(data)
        sessionStorage.removeItem("currentUser")
        sessionStorage.removeItem("X-CSRF-Token")

        dispatch(logoutUser(data))
        return data
    }
}



export async function restoreSession() {

    if(sessionStorage.getItem("X-CSRF-Token") === null){
        const token = await restoreCSRF()
    }else{
        const token = sessionStorage.getItem("X-CSRF-Token")
    }

    const res = await fetch("/api/session/get_current", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Tofken": sessionStorage.getItem("X-CSRF-Token")
        }
    })
    const data = await res.json()

    if(data){
        console.log("here")
        storeCurrentUser(data)
        loginUser({"current_user": data})
        return data
    }else{
        console.log(data)
        sessionStorage.removeItem("currentUser")
        sessionStorage.removeItem("X-CSRFToken")

        logoutUser({})
        return {"error":"unauthorized"}
    }
  };




export default function SessionReducer(initialState= {currentUser: null},action){
    switch(action.type){
        case LOGIN_USER:
            return {...action.user}
        case LOGOUT_USER:
            return {current_user: null}
        default:
            return {...initialState}
        
    }
}