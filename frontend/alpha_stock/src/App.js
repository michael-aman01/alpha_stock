
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';

import NavBar from './components/NavBar'
import ResearchPage from './components/ResearchPage';
function App() {
  return (
    <>
     
    <Routes>
      <Route exact path="/login" Component={LoginForm}></Route>
      <Route exact path='/profile' Component={ResearchPage}></Route>
    </Routes>


  

    </>
  );
}

export default App;
