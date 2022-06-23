import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import AlbumContext from '../../context/album/albumContext'
import Pic from './math.png'

const AlbumView = () => {
    const albumContext = useContext(AlbumContext)
    const { albums } = albumContext  
    
    const { id } = useParams()
    
    const album = albums.filter(item => item._id === id)[0]

    return (
        <div>
        <h2>{album.title}</h2>
       {album.pics.map(pic =>(
           <div key={pic}>
           <p>{pic}</p>
           <p>{pic.descr || 'The picture was taken once'}</p>
           <img src = {Pic} style={{"width": "200px"}}/>
           </div>
       ))}
        </div>
    )
}

export default AlbumView