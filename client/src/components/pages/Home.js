import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context/user/userContext'
import AlbumContext from '../../context/album/albumContext'



const Home = () => {
    const userContext = useContext(UserContext)
    const { loadUser, getUsers } = userContext

    const albumContext = useContext(AlbumContext)
    const { albums, getAlbums, loading } = albumContext  

    const navigate = useNavigate()
    
    useEffect(()=> {
        const token = localStorage.getItem('token')       
        if(token) {
            loadUser() 
            getUsers()
            getAlbums()            
        } else {
            navigate('/login')
        }         
    }, [])

    return (loading ? (<div className='ui active centered inline loader'>Loading</div>
            ) : (<div className='ui justified container'>
            {albums.length>0? (<h2 className='ui header'>You can see the following albums:</h2>): (
                <h2 className='ui header'>There are no albums to see!</h2>)}
            {albums.map( album =>(
                album.pics.length>0 && <h3 key={album._id}>
                <Link to={`/album/${album._id}`}>{album.title}, {album.year} </Link></h3>)          
            )}
            </div>)
        )
}

export default Home