import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AlbumContext from '../context/albumContext'

const Home = () => {
    const albumContext = useContext(AlbumContext)
    const { albums } = albumContext

    return (
        <div>
        <h2>You can see the following albums:</h2>
        {albums.map((album)=>(
            <p key={album.id}>
            <Link to={`/album/${album.id}`} >
            {album.title}, {album.year}
            </Link>
            </p>
            
        ))
    }
       

        </div>
    )
}

export default Home