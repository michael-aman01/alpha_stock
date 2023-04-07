
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';

import NavBar from './components/NavBar'
import ResearchPage from './components/ResearchPage';

import Banner from './components/Banner';
import { loginUser, restoreSession } from './store/session';
import StatementChart from './components/StatementChart';
import SignUpForm from './components/SignUpForm';


function App({initialRoute}) {
  const navigate = useNavigate()
  useEffect(() => {
    if(initialRoute){
      navigate(initialRoute)
    }

  },[])
  return (
    <>
     
    <Routes>
      <Route exact path='/profile' Component={ResearchPage}></Route>
     <Route exact path="/login" Component={LoginForm}></Route>
     <Route exact path="/signup" Component={SignUpForm}></Route>
    </Routes>


  

    </>
  )
}

export default App;
