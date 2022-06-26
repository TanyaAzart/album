import React from 'react'


const EditAlbum = ({ album, onChange, deletePicture, onTitleChange })=> {
    
    return (
        <div>
            <h3>Edit Album</h3>
          
            <h3>List of fotos in the album:</h3>
            { album.pics.map( pic => (<div key={pic.name}>
                <p>{pic.name}</p>
                <input 
                    type='text'
                    placeholder={pic.title}
                    onChange= {(e)=>onTitleChange(e, pic.name)}
                    />
                <button onClick={()=> deletePicture(pic.name)}>Delete picture</button>
                    
            </div>)
            ) 
            }  
            
     </div>)
}

export default EditAlbum
         