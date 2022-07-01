import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AlbumContext from '../../context/album/albumContext'


const CreateAlbum = () => {

    const albumContext = useContext(AlbumContext)
    const { current, addAlbum } = albumContext   

    const navigate = useNavigate()

    const [ album, setAlbum ] = useState({
        title: '',
        year: '',
        descr: ''
    })  

    useEffect(()=> {
        if(current) {
            navigate(`/admin/album/upload/${current}`)
        }
    },[album, current])
    

    const onChange = (e)=> {  
        setAlbum({
            ...album,
            [e.target.name]: e.target.value
        })   
    }
    
    const onSubmit =(e)=>{
        e.preventDefault() 
        
        addAlbum(album)
        
        alert("Album created!") 
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
                        <button onClick={onSubmit}>Create album</button>                     
                </form>                   
        </div>)             
}

export default CreateAlbum