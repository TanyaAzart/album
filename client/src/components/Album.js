import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import Previews from './Previews'
import AlbumContext from '../context/albumContext'

const Album = () => {
    const albumContext = useContext(AlbumContext)
    const { albums, addAlbum, editAlbum } = albumContext   

    const navigate = useNavigate()

    const { id } = useParams ()

    const [ album, setAlbum ] = useState({
        id: uuidv4(),
        title: '',
        year: '',
        descr: '',
        pics:[],
        createdAt: Date.now()
    })  
        
    useEffect(()=> { 
        if(id) {
            setAlbum(albums.find(album=>album.id === id))
        } 

    },[])   

    useEffect(()=> { 
    
    },[album]) 

    const onChange = (e)=> {  
        setAlbum( {
            ...album,
            [e.target.name]: e.target.value
        })    
    }
    
    const onSubmit =(e)=>{
        e.preventDefault() 
        if(id) {
            editAlbum(id, album)
        } else {
            addAlbum(album)
        }    
        navigate('/admin')
    }

    const onAddPictures = files => {
        const images = [...album.pics]
        
        files.map(file => {
            if(!images.includes(file.name)){
                images.push(file.name)
            }
        }) 
        setAlbum({
            ...album,
            pics: images
        })      
    }   
    
    const deletePicture = pic => {
        setAlbum({
            ...album,
            pics: album.pics.filter(item => item !== pic)
        })         
    }
    
    return (
        <div>
             <h3>{id? 'Edit Album' : 'Create Album' }</h3>
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
                        </form>
                    <div>
                    <h3>List of fotos in the album:</h3>
                    {album.pics.map((pic, index) => (<div key={pic}>
                        <p>{pic}</p>
                        <button onClick={()=> deletePicture(pic)}>Delete picture</button>
                        </div>
                    ))}
                    
                    </div>
                           
                    <Previews onAddPictures={onAddPictures}/>
                    <button onClick={onSubmit}>Save changes</button>   
            </div>
            )        
        }
                                
        


export default Album