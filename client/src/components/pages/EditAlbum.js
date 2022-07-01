import React, { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import AlbumContext from '../../context/album/albumContext'


const EditAlbum = ()=> {
    const albumContext = useContext(AlbumContext)
    const { albums, editAlbum, deletePicture } = albumContext 

    const {id} = useParams()

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
        
        alert("Album saved!") 

    }   
    
    const onDeletePicture = name => {

        deletePicture(id, name)

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

    return (
        <div>
            <h3>Edit Album</h3>
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
            <h3>List of fotos in the album:</h3>
            { album.pics.map( pic => (<div key={pic._id}>
                <p>{pic.name}</p>
                <input 
                    type='text'
                    placeholder={pic.title}
                    onChange= {(e)=>onTitleChange(e, pic.name)}
                    />
                <button onClick={()=> onDeletePicture(pic.name)}>Delete picture</button>
            </div>)
            ) 
            }
            <button onClick={onSubmit}>Save</button> 

            <Link  to={`/admin/album/upload/${id}`}>Add fotos to your album</Link>            
     </div>)
}

export default EditAlbum
         