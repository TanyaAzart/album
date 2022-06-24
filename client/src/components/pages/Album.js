import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CreateAlbum from '../layouts/CreateAlbum'
import EditAlbum from '../layouts/EditAlbum'
import Previews from '../layouts/Previews'
import AlbumContext from '../../context/album/albumContext'


const Album = () => {

    const albumContext = useContext(AlbumContext)
    const { albums, addAlbum, editAlbum } = albumContext   

    const { id } = useParams ()

    const navigate = useNavigate()    

    const [ album, setAlbum ] = useState({
        title: '',
        year: '',
        descr: '',
        pics:[]
    })  

    useEffect(()=> {       
        if(id) {
            setAlbum(albums.find(album=> album._id === id))       
        }  
    },[id, albums]) 

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
        
        if(id) {
            editAlbum(album)
           
        } else {
            addAlbum(album)
           
        }  
        alert("Album saved!") 
        navigate('/admin')
    }

    const addPictures = pics => {        
        
        const images = [...album.pics]

        const names = []
        
        images.forEach(image => names.push(image.name))

        for (let i=0; i < pics.length; i++){
            if(!names.includes(pics[i].name)){
                images.push(pics[i])
            }
        }           
        
        setAlbum({
            ...album,
            pics: images
        })   
    }   
    
    const deletePicture = name => {
       
        setAlbum({
            ...album,
            pics: album.pics.filter(pic => pic.name !== name)
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

     
    return album? (<div>
             {id ? <EditAlbum 
                    album={album} 
                    onChange={onChange} 
                    deletePicture={deletePicture}
                    onTitleChange={onTitleChange}
                    /> : <CreateAlbum 
                            album={album} 
                            onChange={onChange} 
                            deletePicture={deletePicture}
                            />}
             <Previews addPictures={addPictures}/>  
             <button onClick={onSubmit}>Save</button>
            </div>)  : (<div>Loading...</div>)               
        }

export default Album