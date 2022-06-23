import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlbumContext from '../../context/album/albumContext'
import UserContext from '../../context/user/userContext'

const AdminPage = () => {
    const userContext = useContext(UserContext)
    const albumContext = useContext(AlbumContext)
    const { current } = userContext
    const { albums, deleteAlbum } = albumContext    

    const navigate = useNavigate()

    useEffect(()=> {
        if (!(current && current.name === 'admin')) {
            navigate('/')
        }
    }, [])

    const onEditClick =(id)=>{
        navigate(`/admin/album/${id}`)    
    }
    
    return (
        <div>
        <h2><Link to='album'>Create New Album</Link></h2>
        <h2>Your albums: </h2>
            <ul className='albums'>
            {albums.map((item) =>(   
                <li key={item._id} >
                    <p>Title: {item.title}, Year: {item.year}</p> 
                    <button onClick={()=>onEditClick(item._id)}>Edit</button>
                    <button onClick={()=>deleteAlbum(item._id)}>Delete</button>
                </li>           
            ))} 
            </ul>
        </div>
    )
}

export default AdminPage