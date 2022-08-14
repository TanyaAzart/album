import React, { useContext } from 'react'
import Avatar from './yoshi.png'
import CommentContext from '../../context/comment/commentContext'
import UserContext from '../../context/user/userContext'


const Comments = ({ picComments }) => {

    const commentContext = useContext(CommentContext)
    const { deleteComment } = commentContext

    const userContext = useContext(UserContext)
    const { users, user } = userContext

    return (<div className='ui container justified'>
        { picComments.map(comment => (<div key ={comment._id} className='comment' >
            <span className='avatar'>
          {users.find(user=> user._id ===comment.owner).avatar ? (<img src={`data:image/png;base64, ${users.find(user=> user._id ===comment.owner).avatar}`} />
          ) : <img src={Avatar}/>}
               
                </span>
                <div className='content'>
                    <span className='autor'>{users.find(user=> user._id === comment.owner).name}</span>
                    <div className='metadata'>
                    <span className='date'>{comment.createdAt.slice(0,10)}</span>
                    </div>
                        <div className='text'>{comment.text}                
                            { (user._id === comment.owner || user.name === 'admin') &&
                                (<button style={{'marginLeft':'10px'}} className='ui secondary basic button' onClick={()=> deleteComment(comment._id)}>Delete</button>)
                            }
                        </div>
                </div>              
        </div>)) }
    </div>)
}

export default Comments
