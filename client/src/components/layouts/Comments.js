import React, { useState, useContext, useEffect } from 'react'
import CommentContext from '../../context/comment/commentContext'
import UserContext from '../../context/user/userContext'


const Comments = ({ picComments }) => {

    const commentContext = useContext(CommentContext)
    const { deleteComment, editComment } = commentContext

    const userContext = useContext(UserContext)
    const { users, user } = userContext

    const [ current, setCurrent ] = useState(null)

    const onEditClick =(comment)=> {
        setCurrent(comment)       
    }

    const onChange = (e) => {
        setCurrent({
            ...current,
            text: e.target.value })
    }    

    const saveChanges = ()=> {
        editComment(current)
        setCurrent(null)
    }


    return (<div>
        { picComments.map(comment => (<div key ={comment._id} >
            { (!current || (comment._id !== current._id)) && (<span>
                <span>{users.find(user=> user._id === comment.owner).name}</span>
                <span>{comment.text}</span>
            
            { (user._id === comment.owner || user.name === 'admin') &&(<span>
            <button onClick={()=> onEditClick(comment)}>Edit</button> </span>
            )}
            </span> ) }    

            { current && (comment._id === current._id) && (<span>
                <input type='text' value={current.text} onChange={onChange}/>
                <button onClick ={saveChanges}>Save changes</button>
            </span> ) }

            <button onClick={()=> deleteComment(comment._id)}>X</button>
            </div> 
            )
            )
        }
        </div>)
}

export default Comments