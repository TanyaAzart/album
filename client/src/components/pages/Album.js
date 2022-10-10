import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Comments from '../layouts/Comments'
import AddComment from '../layouts/AddComment'
import AlbumContext from '../../context/album/albumContext'
import CommentContext from '../../context/comment/commentContext'
import LeftArrow from './left-arrow.png'
import RightArrow from './right-arrow.png'

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
    },[index, album])  

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
             
                <div className='ui two column doubling stackable grid container'>
                    <div className='column'> 
                    <img style={{'width': '30px', 'float':'left'}} src={LeftArrow} onClick ={showPrevious}/>                  
                    <img style={{'width': '30px', 'float':'right'}} src={RightArrow} onClick ={showNext}/>
                    <img src={src} className='ui centered large rounded image'/>                    
                </div>
                <div className='column'>
                    <div className='ui center aligned container'>
                    <h2 className='ui header'>{`Album: "${album.title}"`}</h2>
                        <div className='ui message'>
                        <p style={{'fontStyle':'italic'}}>{album.descr}</p>
                        </div>
                    </div>                    
                        <div className='ui comments'>
                        <h3 className="ui dividing header">Comments</h3>
                        {picComments && <Comments picComments={picComments}/>}
                        </div>                    
                        <AddComment albumId ={id} picId={pic._id}/>    
                    </div>
                </div>)
    )
}

export default Album   