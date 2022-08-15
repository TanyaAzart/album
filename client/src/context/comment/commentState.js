import React, { useReducer } from 'react'
import axios from 'axios'
import CommentContext from './commentContext'
import CommentReducer from './commentReducer'

import {
    ADD_COMMENT,
    DELETE_COMMENT,
    GET_COMMENTS
} from '../types'

const CommentState = (props)=> {

    const API_URL = process.env.NODE_ENV === "production"  ? "https://album-tanya-azart.herokuapp.com" : "http://localhost:4000";

    const [ state, dispatch] = useReducer(CommentReducer, {
        comments: []
    })

    const getComments = async (id)=> {
        
        try {
            const res = await axios.get(`${API_URL}/comments/${id}`)

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
            const res = await axios.post(`${API_URL}/comments`, data)        
            
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            })

        } catch (error) {
            console.log(error)
        }
    }

    const deleteComment = async (id) => {
        try {
            const res = await axios.post(`${API_URL}/comments/delete/${id}`)

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
            getComments
        }}
        >
        {props.children}
        </CommentContext.Provider>
    )
}

export default CommentState
