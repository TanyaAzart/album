import React, { useContext } from 'react'
import AlbumContext from '../../context/album/albumContext'

const PicturesList=()=> {  

  const albumContext = useContext(AlbumContext)
  const { current, deletePicture } = albumContext
  
  return (
    <div>
    <h3>List of fotos in the album:</h3>
    { current.pics.map( pic => (<div key={pic.name}>
        <span>{pic.name}</span>
        <button onClick={()=> deletePicture(pic.name)}>Delete picture</button>
        </div>)
        )    
    }
    </div>
  )
}

export default PicturesList