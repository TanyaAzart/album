import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlbumContext from '../context/albumContext'

const AdminPage = () => {

    const albumContext = useContext(AlbumContext)
    const { albums, removeAlbum } = albumContext    

    const navigate = useNavigate()

    const onEditClick =(id)=>{
        navigate(`/admin/album/${id}`)    
    }
    
    return (
        <div>
        <h2><Link to='album'>Create New Album</Link></h2>
        <h2>Your albums: </h2>
            <ul className='albums'>
            {albums.map((item) =>(   
                <li key={item.id} >
                    <p>Title: {item.title}, Year: {item.year}</p> 
                    <button onClick={()=>onEditClick(item.id)}>Edit</button>
                    <button onClick={()=>removeAlbum(item.id)}>Remove</button>
                </li>           
            ))} 
            </ul>
        </div>
    )
}

export default AdminPage