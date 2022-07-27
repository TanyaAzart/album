import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AlbumContext from '../../context/album/albumContext'
import AlbumForm from '../layouts/AlbumForm'
import AlertContext from '../../context/alert/alertContext'
import Modal from '../layouts/Modal'


const CreateAlbum = () => {

    const albumContext = useContext(AlbumContext)
    const { addAlbum, current } = albumContext 
    
    const alertContext = useContext(AlertContext)
    const { alert, setAlert  } = alertContext

    const navigate = useNavigate()

    const [ album, setAlbum ] = useState({
        title: '',
        year: '',
        descr: ''
    })  

    // useEffect(()=> {
    //     if(current) {           
    //         navigate(`/admin/album/upload/${current}`)
    //     }
    // },[current])
    

    const onChange = (e)=> {  
        setAlbum({
            ...album,
            [e.target.name]: e.target.value
        })   
    }
    
    const onSubmit =(e)=>{
        e.preventDefault() 
        
        addAlbum(album)

        setAlert({
            alert: true,
            text: 'Album Created!',
            yesButton: 'OK',
            noButton: ''
        })       
    }   

    const onCancel = ()=> {
        navigate('/admin')
    }

    const handleAlert=()=> {
        setAlert({
            alert: false,
            header: 'Warning!',
            text: '',
            yesButton: '',
            noButton: ''
        })
        navigate(`/admin/album/upload/${current}`)
    }
     
    return (<div>
        {alert && <Modal handleAlert={handleAlert}/>}
        <h3>Create album</h3>
        <AlbumForm  album={album} onChange={onChange}/> 
        <button onClick={onSubmit}>Create Album</button> 
        <button onClick={onCancel}>Cancel</button>                
        </div>)             
}

export default CreateAlbum