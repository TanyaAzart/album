import React, { useState, useContext, useEffect } from 'react'
import UploadImages from '../layouts/UploadImages'
import AlbumContext from '../../context/album/albumContext'


const CreateAlbum = () => {

    const albumContext = useContext(AlbumContext)
    const { addAlbum } = albumContext   

    const [ album, setAlbum ] = useState({
        title: '',
        year: '',
        descr: '',
        pics:[]
    })  

    useEffect(()=> {

    },[album])
    

    const onChange = (e)=> {  
        setAlbum({
            ...album,
            [e.target.name]: e.target.value
        })   
    }
    
    const onSubmit =(e)=>{
        e.preventDefault() 
        
        addAlbum(album)
        
        alert("Album saved!") 
    }   
     
    return (<div>
        <h3>Create album</h3>
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
                        <button onClick={onSubmit}>Save</button>                     
                </form>
                <UploadImages />        
        </div>)             
}

export default CreateAlbum