import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CreateAlbum from '../layouts/CreateAlbum'
import EditAlbum from '../layouts/EditAlbum'
import AlbumForm from '../layouts/AlbumForm'
import Previews from '../layouts/Previews'
import PicturesList from '../layouts/PicturesList'
import AlbumContext from '../../context/album/albumContext'


const Album = () => {

    const albumContext = useContext(AlbumContext)
    const { albums, addAlbum, editAlbum } = albumContext   

    const { id } = useParams ()

    const navigate = useNavigate()    

    const [ album, setAlbum ] = useState({})

    // const [ album, setAlbum ] = useState({
    //     title: '',
    //     year: '',
    //     descr: '',
    //     pics:[]
    // })  

    // useEffect(()=> {       
    //     if(id) {
    //         setAlbum(albums.find(album=> album._id === id))       
    //     }  
    // },[album]) 

    // useEffect(()=> {

    // },[album])
    

    // const onChange = (e)=> {  
    //     setAlbum({
    //         ...album,
    //         [e.target.name]: e.target.value
    //     })   
    // }
    
    // const onSubmit =(e)=>{
    //     e.preventDefault() 
        
    //     if(id) {
    //         editAlbum(album)
           
    //     } else {
    //         addAlbum(album)
           
    //     }  
    //     alert("Album saved!") 
    //     navigate('/admin')
    // }

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

     
    return (<div>
        <h3>{id? 'Edit album': 'Create album'}</h3>
            <AlbumForm id={id} />
                {id && <PicturesList 
                        album={album}
                        deletePicture={deletePicture}
                        />}
            <Previews addPictures={addPictures}/>        
        </div>)             
}

export default Album