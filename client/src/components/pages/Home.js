import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context/user/userContext'
import AlbumContext from '../../context/album/albumContext'

const Home = () => {
    const userContext = useContext(UserContext)
    const albumContext = useContext(AlbumContext)
    const { albums, getAlbums } = albumContext   
    const { loadUser } = userContext

    const navigate = useNavigate()
    
    useEffect(()=> {
        const token = localStorage.getItem('token')        
        
        if(token) {
            loadUser()            
        } else {
            navigate('/login')
        }  
        getAlbums()
    }, [])

    return (<div>
            <h2>You can see the following albums:</h2>
            {albums.map( album =>(
                <p key={album._id}>
                <Link to={`/album/${album._id}`} >
                {album.title}, {album.year}
                </Link>
                </p>            
            ))
            }
        </div>)
}

export default Home