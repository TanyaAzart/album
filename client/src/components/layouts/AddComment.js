import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../../context/user/userContext'
import CommentContext from '../../context/comment/commentContext'

const AddComment = ({ albumId, picId }) => { 

  const userContext = useContext(UserContext)
  const { user } = userContext

  const commentContext = useContext(CommentContext)
  const { addComment } = commentContext

  const [ text, setText ] = useState('')

  const onChange = (e) => {
    setText(e.target.value)
  }

  const onAddComment = ()=> {
    
    addComment({
      text: text,
      pic: picId,
      album: albumId,
      owner: user._id
    })
    setText('')
  }

  return (
    <div>
    <span>{user.name}</span>
    <input type='text' placeholder='Enter comment' onChange={onChange} value={text}/>
    <button onClick ={onAddComment} >Add comment</button>
    </div>
  )
}

export default AddComment