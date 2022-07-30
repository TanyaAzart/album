import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../layouts/Modal'
import AlbumContext from '../../context/album/albumContext'
import UserContext from '../../context/user/userContext'
import AlertContext from '../../context/alert/alertContext'

const AdminPage = () => {
    const userContext = useContext(UserContext)
    const albumContext = useContext(AlbumContext)
    const alertContext = useContext(AlertContext)
    
    const { user } = userContext
    const { albums, getAlbums, deleteAlbum } = albumContext    
    const { alert, setAlert, removeAlert } = alertContext

    const navigate = useNavigate()

    const [ id, setId ] = useState(null)

    useEffect(()=> {
        if (!(user && user.name === 'admin')) {
            navigate('/')
        }
        getAlbums()
        
    },[])

    const onEditClick =(id)=>{        
        navigate(`/admin/album/${id}`) 
    }
    
    const onDeleteClick = (albumId)=> {      
        setAlert({
            alert: true,
            header: 'DELETION WARNING',
            text: 'Are you sure you wish to delete the album?',
            yesButton: 'DELETE',
            noButton: 'CANCEL'
        })
        setId(albumId)
    }

    const handleDelete =()=> {
        deleteAlbum(id)
        setId(null)
        removeAlert()
        // navigate('/')
    }

    return (
        <div className='ui center aligned container'>
        {alert && (<Modal  
                    handleAlert={handleDelete}
                    />)}
        <h2><Link to='album'>Create New Album</Link></h2>
        {albums.length!==0 && (<h2>Your albums: </h2>)}
            <ul className='albums'>
            {albums.map( album =>( 
                <div className='ui horizontal divider' key={album._id}>
                <li >
                    <span style={{padding: '10px'}}>Title: {album.title}, Year: {album.year}</span> 
                    <span>
                    <button className='ui basic button primary' onClick={()=>onEditClick(album._id)}>Edit</button>
                    <button className='ui basic button secondary'  onClick={()=>onDeleteClick(album._id)}>Delete</button>
                    </span>                   
                </li>  
                </div>                          
            ))} 
            </ul>
            
        </div>
    )
}

export default AdminPage