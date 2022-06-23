import React from 'react'
import AlbumForm from './AlbumForm'

const CreateAlbum = ({ album, onChange, deletePicture })=> {

    return (
        <div>
            <h3>Create Album</h3>
            <AlbumForm album ={album} onChange={onChange}/>
            <h3>List of fotos in the album:</h3>
            { album.pics.map( pic => (<div key={pic.name}>
                <span>{pic.name}</span>
                <button onClick={()=> deletePicture(pic.name)}>Delete picture</button>
                </div>)
                )    
            }
     </div>)
}

export default CreateAlbum
         