

const LOGIN_USER = "session/LOGIN_USER"
const LOGOUT_USER = "session/LOGOUT_USER"


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
    const res = await fetch("/api/session/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    if(data){
        console.log(data)
        return dispatch(loginUser(data))
    }
}


export const logout = user => async dispatch => {
    const res = await fetch("/api/session/logout")
    const data = await res.json()
    if(data){
        console.log(data)
        return dispatch(logoutUser(data))
    }
}

export default function SessionReducer(initialState={},action){
    switch(action.type){
        case LOGIN_USER:
            return {current_user: action.user}
        case LOGOUT_USER:
            return {current_user: null}
        default:
            return {...initialState}
        
    }
}