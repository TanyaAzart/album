import React, { useReducer } from 'react'
import axios from 'axios'
import CommentContext from './commentContext'
import CommentReducer from './commentReducer'

import {
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    GET_COMMENTS
} from '../types'

const CommentState = (props)=> {
    const [ state, dispatch] = useReducer(CommentReducer, {
        comments: []
    })
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }}

    const getComments = async (id)=> {
        
        try {
            const res = await axios.get(`http://localhost:4000/comments/${id}`)

            dispatch({
                type: GET_COMMENTS,
                payload: res.data
            })

        } catch(err) {
            console.log(err)
        }
    }

    const addComment =  async (data) => {
        
        try {
            const res = await axios.post('http://localhost:4000/comments', data)        
            
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            })

        } catch (error) {
            console.log(error)
        }
    }

    const editComment = async (data)=> {
        try {

            const res = await axios.post(`http://localhost:4000/comments/${data._id}`, data)        
            
            dispatch({
                type: EDIT_COMMENT,
                payload: res.data
            })


        } catch(err) {
            console.log(err)
        }
    }

    const deleteComment = async (id) => {
        try {
            const res = await axios.post(`http://localhost:4000/comments/delete/${id}`)

            dispatch({
                type: DELETE_COMMENT,
                payload: res.data
            })

        } catch (error) {
            console.log(error)
        }
    }   


    return (
        <CommentContext.Provider
        value={{
            comments: state.comments,
            addComment,
            deleteComment,
            editComment,
            getComments
        }}
        >
        {props.children}
        </CommentContext.Provider>
    )
}

export default CommentState
