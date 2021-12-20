import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext.js";
import Home from './pages/home/Home.jsx'
import Profile from './pages/home/Profile/Profile.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import React,{useContext} from 'react'

// import Person from '@material-ui/icons/Person';

function App() {

 const {user} = useContext(AuthContext);

  return (
    <Router>
        <Routes>
            <Route exact path='/' element={user ? <Home/> : <Register/>}/>
            <Route exact path='/login' element={user ? <Navigate to='/'/> : <Login/>}/>
            <Route exact path='/register' element={user ? <Navigate to='/'/> : <Register/>}/>
            <Route exact path='/profile/:username' element={<Profile/>}/>
        </Routes>
    </Router>
   );
}

export default App;
