import React, { useContext, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminPage from './components/pages/AdminPage'
import Album from './components/pages/Album'
import AlbumView from './components/pages/AlbumView' 
import Home from './components/pages/Home' 
import Register from './components/pages/Register' 
import Login from './components/pages/Login' 
import Navbar from './components/layouts/Navbar' 
import AlbumState from './context/album/albumState'
import UserState from './context/user/userState'
import './App.css'
import setAuthToken from './utils/setAuthToken'


const App= ()=> {
  
  setAuthToken()

  return (
    <AlbumState>
    <UserState>
      <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path='/admin' element={<AdminPage />}/>
          <Route path='/admin/album' element={<Album />}/>
          <Route path='/admin/album/:id' element={<Album />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/album/:id' element={<AlbumView />}/>
        </Routes>
      </Router>
    </div>
    </UserState>
    </AlbumState>
    
  );
}

export default App;