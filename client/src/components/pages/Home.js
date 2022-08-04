import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context/user/userContext'
import AlbumContext from '../../context/album/albumContext'



const Home = () => {
    const userContext = useContext(UserContext)
    const { user, loadUser, getUsers } = userContext

    const albumContext = useContext(AlbumContext)
    const { albums, getAlbums } = albumContext  

    const navigate = useNavigate()
    
    useEffect(()=> {
        const token = localStorage.getItem('token')       
        if(token) {
            loadUser() 
            getAlbums()
            getUsers()
        } else {
            navigate('/login')
        }         
    }, [])

    return (<div className='ui center aligned container'>
            <h2 className='ui blue header'>You can see the following albums:</h2>
            {albums.map( album =>(
                album.pics.length>0 && <h3 key={album._id}>
                <Link to={`/album/${album._id}`}>
                {album.title}, {album.year}
                </Link>
                </h3>          
            ))
            }
        </div>)
}

export default Home