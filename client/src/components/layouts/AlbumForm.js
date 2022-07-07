import React from 'react'

const AlbumForm = ({ album, onChange }) => {
  return (
    <div>
    <form >
            <input 
                    type='text' 
                    name='title'
                    value={album.title}
                    onChange={onChange}/>
            <label>Title</label>
            <input 
                    type='text' 
                    name='year' 
                    value={album.year}
                    onChange={onChange}/>
            <label>Year</label>
            <textarea 
                    name='descr'
                    value={album.descr}
                    onChange={onChange}/>
            <label>Description</label>                     
    </form>
    </div>
  )
}

export default AlbumForm
