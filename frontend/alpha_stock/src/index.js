
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import configureStore from './store/index';
import { restoreCSRF, restoreSession } from './store/session';
import * as sessionActions from "./store/session"
import { useDispatch } from 'react-redux';
import NewsFeed from './components/NewsFeed';
let store = configureStore({});
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.storage = sessionStorage
  window.sessionActions = sessionActions;
}


const renderApplication = (route) => {
  ReactDOM.render(
    <React.StrictMode>

  <Provider store={store}>
          <BrowserRouter>
            <App initialRoute={route}/>
          </BrowserRouter>
        </Provider>

    </React.StrictMode>,
    document.getElementById('root')
  );

}

async function checkUser(){
  
  console.log("here")
  const res = await store.dispatch(sessionActions.restoreSession())
  alert(res)
  if(res){
    renderApplication()
  }else{
    console.log(res)
    renderApplication("/login")

  }
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null 
) {
  checkUser()
} else {
  console.log("here")
  renderApplication("/profile");
}

