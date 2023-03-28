
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';

import NavBar from './components/NavBar'
import ResearchPage from './components/ResearchPage';
function App() {
  const [currentUser,setCurrentUser] = useState()

  useEffect(() => {
    if(currentUser === undefined || currentUser === null){
      if(sessionStorage.getItem("currentUser") !== null){
        setCurrentUser(sessionStorage.getItem("currentUser"))
      }
    }
  },[currentUser])



  return (
    <>
     
    <Routes>
      <Route exact path="/login" Component={LoginForm}></Route>
      <Route exact path='/profile' Component={ResearchPage}></Route>
    </Routes>


  

    </>
  )
}

export default App;
