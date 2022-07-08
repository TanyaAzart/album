import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Comments from '../layouts/Comments'
import AddComment from '../layouts/AddComment'
import AlbumContext from '../../context/album/albumContext'
import CommentContext from '../../context/comment/commentContext'


const Album = () => {
    const albumContext = useContext(AlbumContext)
    const { albums } = albumContext  

    const commentContext = useContext(CommentContext)
    const { getComments, comments } = commentContext  

    const { id } = useParams() 

    useEffect(()=> { 
        getComments(id)              
    },[])

    const album = albums.filter(item => item._id === id)[0]
    
    const [ index, setIndex ] = useState(0)

    const src = `/images/${id}/${album.pics[index].name}`

    const pic = album.pics[index]

    const picComments = comments.filter(comment => comment.pic === album.pics[index]._id)

    useEffect(()=> { 
       
    },[index])
    
    const showPrevious = ()=> {
        if (index === 0){
            setIndex (album.pics.length -1)
        } else {
           setIndex(index - 1)
        }
    }

    const showNext = ()=> {
        if (index === album.pics.length -1){
            setIndex (0)
        } else {
            setIndex(index + 1)
        }
    }

    return (
        <div>
            <h2>{album.title}</h2>
            <h3>{album.year}</h3>
            <p>{album.descr}</p>
            <button onClick ={showPrevious}>{"<< Previous"}</button>
            <img src={src} style={{'width': '400px'}}/>
            <button onClick ={showNext}>{" Next >>"}</button>
            <AddComment albumId ={id} picId={pic._id}/>
            {picComments && <Comments picComments={picComments}/>}
        </div>
    )
}

export default Album