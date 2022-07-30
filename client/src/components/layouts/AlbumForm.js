import React from 'react'

const AlbumForm = ({ album, onChange }) => {
  return (
    <div>
        <div className='two fields'>
        <div className='field'>
        <label>Title</label>
        <input 
                type='text' 
                name='title'
                value={album.title}
                onChange={onChange}/>
        </div>
        <div className='field' style={{width: '10%'}}>
        <label>Year</label>
        <input 
                    type='text' 
                    name='year' 
                    value={album.year}
                    onChange={onChange}/>
        </div>
        <div className='field'>
        <label>Description</label> 
        <textarea 
        name='descr'
        value={album.descr}
        onChange={onChange}/>
        </div>            
        </div>
                            
    </div>
  )
}

export default AlbumForm
