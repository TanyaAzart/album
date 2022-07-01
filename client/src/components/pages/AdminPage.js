import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlbumContext from '../../context/album/albumContext'
import UserContext from '../../context/user/userContext'

const AdminPage = () => {
    const userContext = useContext(UserContext)
    const albumContext = useContext(AlbumContext)
    const { user } = userContext
    const { albums, getAlbums, deleteAlbum, setCurrent } = albumContext    

    const navigate = useNavigate()

    useEffect(()=> {
        if (!(user && user.name === 'admin')) {
            navigate('/')
        }
        getAlbums()
        setCurrent(null)
    },[])

    const onEditClick =(id)=>{
        setCurrent(id)
        navigate(`/admin/album/${id}`) 
    }
    
    return (
        <div>
        <h2><Link to='album'>Create New Album</Link></h2>
        <h2>Your albums: </h2>
            <ul className='albums'>
            {albums.map( album =>(   
                <li key={album._id} >
                    <p>Title: {album.title}, Year: {album.year}</p> 
                    <button onClick={()=>onEditClick(album._id)}>Edit</button>
                    <button onClick={()=>deleteAlbum(album._id)}>Delete</button>
                </li>           
            ))} 
            </ul>
        </div>
    )
}

export default AdminPage