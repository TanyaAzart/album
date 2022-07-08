import { STATES } from 'mongoose'
import {
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    GET_COMMENTS,
    DELETE_COMMENTS
} from '../types'

const commentReducer = (state, action)=>{
    switch (action.type){
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        case DELETE_COMMENTS:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.owner!==action.payload)
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: state.comments.concat(action.payload),
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id!==action.payload._id)
            }
        case EDIT_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id!==action.payload._id).concat(action.payload)
            }
        default:
                return state
    }
}

export default commentReducer