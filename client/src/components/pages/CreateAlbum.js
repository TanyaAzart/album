import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AlbumContext from '../../context/album/albumContext'
import AlbumForm from '../layouts/AlbumForm'

const CreateAlbum = () => {

    const albumContext = useContext(AlbumContext)
    const { addAlbum, current } = albumContext   

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
    },[current])
    

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

    const onCancel = ()=> {
        navigate('/admin')
    }
     
    return (<div>
        <h3>Create album</h3>
        <AlbumForm  album={album} onChange={onChange}/> 
        <button onClick={onSubmit}>Create Album</button> 
        <button onClick={onCancel}>Cancel</button>                
        </div>)             
}

export default CreateAlbum