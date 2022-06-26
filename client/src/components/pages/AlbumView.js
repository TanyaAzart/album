import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
// import Picture from '../layouts/Picture'
import AlbumContext from '../../context/album/albumContext'


const AlbumView = () => {
    const albumContext = useContext(AlbumContext)
    const { albums } = albumContext  
    
    const { id } = useParams()
    
    const album = albums.filter(item => item._id === id)[0]

    return (
        <div>
            <h2>{album.title}</h2>
            <h3>{album.year}</h3>
            
        </div>
    )
}

export default AlbumView