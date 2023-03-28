
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';

import NavBar from './components/NavBar'
import ResearchPage from './components/ResearchPage';

import Banner from './components/Banner';
import { loginUser, restoreSession } from './store/session';

function App() {
  const user = useSelector(state => state.session.currentUser)
  const [currentUser,setCurrentUser] = useState(user)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()
  useEffect(() => {
    if(currentUser === undefined || currentUser === null){
      if(sessionStorage.getItem("currentUser") !== null){
        setCurrentUser(sessionStorage.getItem("currentUser"))
        dispatch(loginUser(JSON.parse(sessionStorage.getItem("currentUser"))))
      }else{
          dispatch(restoreSession())
          setCurrentUser(user)
          
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
