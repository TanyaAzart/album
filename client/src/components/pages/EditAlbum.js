import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AlbumForm from '../layouts/AlbumForm'
import Modal from '../layouts/Modal'
import AlertContext from '../../context/alert/alertContext'
import AlbumContext from '../../context/album/albumContext'



const EditAlbum = ()=> {
    const albumContext = useContext(AlbumContext)
    const { albums, editAlbum, deletePicture } = albumContext 

    const alertContext = useContext(AlertContext)
    const { alert, setAlert, removeAlert  } = alertContext

    const {id} = useParams()

    const navigate = useNavigate()

    const [ album, setAlbum ] = useState({
        title: '',
        year: '',
        descr: '',
        pics:[]
    })  

    useEffect(()=> {
       setAlbum(albums.find(album=> album._id === id))
    },[])

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
       
        editAlbum(album)
        
        setAlert({
            alert: true,
            text: 'Album Saved!',
            yesButton: 'OK'
        }) 
    }   

    const onAddPictures =()=> {
        navigate (`/admin/album/upload/${id}`)
    }

    const onCancel =()=> {
        navigate('/admin')
    }
    
    const onDeletePicture = pic => {

        deletePicture(id, pic)

        setAlbum({
            ...album,
            pics: album.pics.filter(item => item.name !== pic.name)
        }) 
        
    }

    const onTitleChange = (e, name)=> {  
       
        const picsToKeep = album.pics.filter(pic => pic.name !== name)
        const picToUpdate = album.pics.filter(pic => pic.name === name)
        
        picToUpdate[0].title = e.target.value

        setAlbum( {
            ...album,
            pics: picsToKeep.concat(picToUpdate).sort((pic1,pic2)=>{
                const name1 = pic1.name
                const name2 = pic2.name
                if(name1 < name2) {
                    return -1;
                  }
                  else {
                    return 1;
                  }
            })
        })   
    }

    const handleAlert=()=> {
        removeAlert()
        navigate ('/admin')
    }

    return (
        <div>
        { alert && <Modal handleAlert={handleAlert}/>}
            <h3>Edit Album</h3>
            <AlbumForm  album={album} onChange={onChange}/>
            <h3>List of fotos in the album:</h3>
            { album.pics.map( pic => (<div key={pic._id}>
                
                <input 
                    type='text'
                    placeholder={pic.title}
                    onChange= {(e)=>onTitleChange(e, pic.name)}
                    />
                <button onClick={()=> onDeletePicture(pic)}>Delete picture</button>
            </div>)
            ) 
            }
            <button onClick={onSubmit}>Save</button> 
            <button onClick={onAddPictures}>Add pictures</button> 
            <button onClick={onCancel}>Cancel</button>      
     </div>)
}

export default EditAlbum
         