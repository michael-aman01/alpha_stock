
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/index';
import { restoreCSRF, restoreSession } from './store/session';
import * as sessionActions from "./store/session"
import { useDispatch } from 'react-redux';
let store = configureStore({});
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.storage = sessionStorage
  window.sessionActions = sessionActions;
}


export default function Root(){

  return(
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  )
}

const renderApplication = () => {
  
ReactDOM.render(
  <React.StrictMode>
    <Root></Root>
  </React.StrictMode>,
  document.getElementById('root')
);

}

if(sessionStorage.getItem("X-CSRF-Token") === null || sessionStorage.getItem("X-CSRF-Token") === undefined
|| sessionStorage.getItem("currentUser") === null || sessionStorage.getItem("currentUser") === undefined){
  restoreSession().then(renderApplication())
}else{
  renderApplication()
}

