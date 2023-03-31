import { compose } from "redux";

const ADD_TO_WATCHLIST = 'stocks/ADD_TO_WATCHLIST'
const LOGIN_USER = "session/LOGIN_USER"
const LOGOUT_USER = "session/LOGOUT_USER"

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
  }

  
  export const addToWatchList = (data) => {
    return({
        type: ADD_TO_WATCHLIST,
        data: data.watchlist
    })
}





  export function storeCSRFToken(token) {

    if (token) sessionStorage.setItem("X-CSRF-Token", token);
  }
  
  export async function restoreCSRF() {
    const response = await fetch("/api/csrf");

    const token = await response.headers.get("X-CSRFToken")
    storeCSRFToken(token)
    return token;
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
    let token
    if(sessionStorage.getItem("X-CSRF-Token") === null){
        token = await restoreCSRF()
    }else{
        token = sessionStorage.getItem("X-CSRF-Token") 
    }
    
    const res = await fetch("/api/session/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": token
        }
    })

    const data = await res.json()
    if(data){
        console.log(data)
    
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



export const restoreSession = () =>  async dispatch =>  {
    let token
    if(sessionStorage.getItem("X-CSRF-Token") === null){
        token = await restoreCSRF()
    }else{
        token = sessionStorage.getItem("X-CSRF-Token") 
    }

    const res = await fetch("/api/session/get_current", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
        }
    })
    const data = await res.json()

    if(data.ok){
        const token = await res.headers.get("X-CSRFToken")
        storeCSRFToken(token)
        storeCurrentUser(data)
        dispatch(loginUser(data))
        return data
    }
  };

  


  export const updateWatchlist = user => async dispatch => {

    const res = await fetch(`/api/users/watchlist/`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": sessionStorage.getItem("X-CSRF-Token")
        }
    })
    const data = await res.json()

    if(data){
        console.log(data)
        await dispatch(addToWatchList(data))
        return data
    }
}





export default function SessionReducer(initialState= {currentUser: null, watchlist: null},action){
    
    switch(action.type){
        case ADD_TO_WATCHLIST:
            console.log(action)
            return {...initialState.currentUser, watchlist: action.data}
        case LOGIN_USER:
            return {currentUser: action.user}
        case LOGOUT_USER:
            return {current_user: null}
        default:
            return {...initialState}
        
    }
}