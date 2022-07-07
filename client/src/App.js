import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/pages/Register' 
import Login from './components/pages/Login' 
import Home from './components/pages/Home' 
import AdminPage from './components/pages/AdminPage'
import CreateAlbum from './components/pages/CreateAlbum'
import EditAlbum from './components/pages/EditAlbum'
import UploadImages from './components/pages/UploadImages'
import Album from './components/pages/Album' 
import Navbar from './components/layouts/Navbar' 
import AlbumState from './context/album/albumState'
import UserState from './context/user/userState'
import CommentState from './context/comment/commentState'
import './App.css'
import setAuthToken from './utils/setAuthToken'


const App= ()=> {
  
  setAuthToken()

  return (
    <AlbumState>
    <UserState>
    <CommentState>
      <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/admin' element={<AdminPage />}/>
          <Route path='/admin/album' element={<CreateAlbum />}/>
          <Route path='/admin/album/:id' element={<EditAlbum />}/>
          <Route path='/admin/album/upload/:id' element={<UploadImages />}/>          
          <Route path='/album/:id' element={<Album />}/>
        </Routes>
      </Router>
    </div>
    </CommentState>
    </UserState>
    </AlbumState>
    
  );
}

export default App;
