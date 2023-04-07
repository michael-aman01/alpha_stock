import { useSelector } from 'react-redux';
import csrfFetch from './csrf';


const SET_CURRENT_USER = 'session/SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER';
export const ADD_USER = 'user/ADD_USER'

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
};



const storeCSRFToken = token  => {

  if (token) sessionStorage.setItem("X-CSRF-Token", token);
}

const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
}

const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

export const restoreSession = () => async dispatch => {
  const response = await fetch("/api/session");
  const data = await response.json()

  if(!Object.keys(data).includes("error")){

  storeCSRFToken(data.user["X-CSRF-Token"]);
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));

  return response;
  }else{
    return null
  }

};



export const login = (credential) => async dispatch => {

  const response = await csrfFetch("/api/session/login", {
    method: "POST",
    body: JSON.stringify({ "email":credential.email, "password":credential.password })
  });

  const data = await response.json();
  console.log(response)
  if(data){
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
  }else{
    
    return null
  }


};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE"
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { email, password, first_name, last_name, username} = user;
  const response = await csrfFetch("/api/users/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      username,
      password,
      first_name,
      last_name
    })
  });

  const data = await response.json();
  if(response.ok){
    
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
  }else{
    console.log(data)
    return null
  }


};



const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    
    default:
      return state;
  }
};

export default sessionReducer;