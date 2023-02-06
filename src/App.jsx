import { useContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Auth from './COMPONENTS/Auth';
import Home from './COMPONENTS/Home'
import Post from './COMPONENTS/Post'
import Header from './COMPONENTS/Header';
import AuthContext from './store/authContext';
import {Navigate} from 'react-router-dom'


function App() {
  const {token}= useContext(AuthContext)
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route index element={token ? <Navigate to='/post'/> : <Auth/> }/>
        <Route path='/home' element={token ? <Home/> : <Navigate to='/'/>}/>
        <Route path='/post' element={token ? <Post/> : <Navigate to='/'/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
