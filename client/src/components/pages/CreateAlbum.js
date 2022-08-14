import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AlbumContext from '../../context/album/albumContext'
import AlbumForm from '../layouts/AlbumForm'
import AlertContext from '../../context/alert/alertContext'
import Modal from '../layouts/Modal'


const CreateAlbum = () => {

    const albumContext = useContext(AlbumContext)
    const { addAlbum } = albumContext 
    
    const alertContext = useContext(AlertContext)
    const { alert, setAlert, removeAlert  } = alertContext

    const navigate = useNavigate()

    const [ album, setAlbum ] = useState({
        title: '',
        year: '',
        descr: '',
        id: null
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
    
    const onSubmit = async (e)=>{
        e.preventDefault() 
        
        const res = await addAlbum(album)

        if (typeof res==='string' && res.indexOf('failed')!==-1){
            setAlert({
                alert: true,
                header: 'CREATE FAILED',
                text:'Complete all fields!',
                yesButton: null,
                noButton:'OK'
            })
        } else {
            setAlbum({
                ...album,
                id: res._id
            })
            setAlert({
                alert: true,
                header: 'SUCCESS',
                text: 'Album Created!',
                yesButton: 'OK',
                noButton: null
            })

        }               
    }   

    const handleAlert =()=> {
        removeAlert()
        navigate(`/admin/album/upload/${album.id}`)
    }

    const onCancel = ()=> {
        navigate('/admin')
    }

     
    return (<div className='ui center aligned container'>
        {alert && <Modal handleAlert={handleAlert}/>}
        <h3 className='ui blue header'>Album Info</h3>
        <form className='ui mini form'>
        <AlbumForm  album={album} onChange={onChange}/> 
        <button className='ui primary button' onClick={onSubmit}>Create Album</button> 
        <button className='ui button' onClick={onCancel}>Cancel</button>     
        </form>
                  
        </div>)             
}

export default CreateAlbum