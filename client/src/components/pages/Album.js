import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Comments from '../layouts/Comments'
import AddComment from '../layouts/AddComment'
import AlbumContext from '../../context/album/albumContext'
import CommentContext from '../../context/comment/commentContext'



const Album = () => {
    const navigate = useNavigate()

    const albumContext = useContext(AlbumContext)
    const { albums, src, getPicture, loading } = albumContext  

    const commentContext = useContext(CommentContext)
    const { getComments, comments } = commentContext   

    const { id } = useParams() 

    const album = albums.filter(item => item._id === id)[0]  
    
    const [ index, setIndex ] = useState(0)  
    
    useEffect(()=> { 
        if(!album){
            navigate('/')
        } else {
            getPicture(album.pics[index].name)
            getComments(id)
        }       
    },[index])  

    const pic = !album ? {} : album.pics[index]

    const picComments = !album ? [] : comments.filter(comment => comment.pic === album.pics[index]._id)    
    
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

    return (loading || !album ? (<div className='ui active centered inline loader'>Loading</div>) : (
        <div className='ui center aligned container'>
            <h2 className='ui header'>{album.title}</h2>
            <h3 className='ui header'>Year: {album.year}</h3>
                <div className='ui info message'>
                    <p>{album.descr}</p>
                </div>
            <button className="ui left floated basic primary button" onClick ={showPrevious}>{"<< Previous"}</button>
            <button className="ui right floated basic primary button" onClick ={showNext}>{" Next >>"}</button>
                <div>           
                    <img src={src} className='ui centered large rounded image'/>           
                </div> 
                <div className='ui comments'>
                    <h3 className="ui dividing header">Comments</h3>
                    {picComments && <Comments picComments={picComments}/>}
                </div>                    
            <AddComment albumId ={id} picId={pic._id}/>           
        </div>)
    )
}

export default Album
