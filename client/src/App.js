import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminPage from './components/AdminPage'
import Album from './components/Album'
import AlbumView from './components/AlbumView' 
import Home from './components/Home' 
import Register from './components/Register' 
import Login from './components/Login' 
import Navbar from './components/Navbar' 
import AlbumState from './context/albumState'
import './App.css'

const App= ()=> {
  return (
    <AlbumState>
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
    </AlbumState>
    
  );
}

export default App;
