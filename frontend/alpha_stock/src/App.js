
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';

import NavBar from './components/NavBar'
import ResearchPage from './components/ResearchPage';

import Banner from './components/Banner';
import { loginUser, restoreSession } from './store/session';

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/profile")
  },[])
  return (
    <>
     
    <Routes>
      <Route exact path='/profile' Component={ResearchPage}></Route>
    </Routes>


  

    </>
  )
}

export default App;
