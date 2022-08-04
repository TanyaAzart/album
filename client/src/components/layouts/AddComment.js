import React, { useState, useContext } from 'react'
import Modal from './Modal'
import UserContext from '../../context/user/userContext'
import CommentContext from '../../context/comment/commentContext'
import AlertContext from '../../context/alert/alertContext'

const AddComment = ({ albumId, picId }) => { 

  const userContext = useContext(UserContext)
  const { user } = userContext

  const commentContext = useContext(CommentContext)
  const { addComment } = commentContext

  const alertContext = useContext(AlertContext)
  const { alert, setAlert, removeAlert  } = alertContext

  const [ text, setText ] = useState('')

  const onChange = (e) => {
    setText(e.target.value)
  }

  const onAddComment = ()=> {

    if (text===''){
      setAlert({
        alert: true,
        text:'Write a comment!',
        yesButton: 'OK',
        noButton:null
      })
      
    } else {
      addComment({
        text: text,
        pic: picId,
        album: albumId,
        owner: user._id
      })
      setText('')
    }   
  }

  const handleAlert = ()=> {
    removeAlert()
  }

  return (
    <div>
      { alert && <Modal handleAlert={handleAlert}/>}
        <div className="ui reply form">
          <div className="field">
            <input type='text' placeholder='Enter comment' onChange={onChange} value={text}/>
          </div>    
            <button className="ui primary submit button" onClick ={onAddComment} >Add comment</button>
        </div>   
    </div>
  )
}

export default AddComment