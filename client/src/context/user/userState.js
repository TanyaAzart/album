import React, { useReducer } from 'react'
import axios from 'axios'
import UserContext from './userContext'
import UserReducer from './userReducer'
import setAuthToken from '../../utils/setAuthToken'

import {
    ADD_USER,
    DELETE_USER,
    LOGIN_USER,
    LOGOUT_USER,
    LOAD_USER,
    GET_USERS
} from '../types'

const UserState = (props)=> {

    const API_URL = process.env.NODE_ENV === "production"  ? "https://album-tanya-azart.herokuapp.com" : "http://localhost:4000";
    
    const [state, dispatch] = useReducer(UserReducer, {
        users: [],
        user: null
    })
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }}

    const loadUser = async () => {
    
        try {
            const res = await axios.get(`${API_URL}/users/login`)

            dispatch({
                type: LOAD_USER,
                payload: res.data
            })

        } catch (error) {
            console.log(error)
        }
    }

    const getUsers = async ()=> {
        try {
            const res = await axios.get(`${API_URL}/users`)

            dispatch({
                type: GET_USERS,
                payload: res.data
            })

        } catch(err) {
            console.log(err)
        }
    }

    const addUser =  async (data) => {
        
        try {
            const res = await axios.post(`${API_URL}/users`, data, config)
            
            localStorage.setItem('token', res.data.token)   
            
            setAuthToken()         
            
            dispatch({
                type: ADD_USER,
                payload: res.data.user
            })

        } catch (err) {
           
            return err.response.data
        }
    }

    const uploadAvatar = async (file)=> {
        try {
            const fd = new FormData()
            
            fd.append('avatar', file, file.name)
            
            const res = await axios.post(`${API_URL}/users/avatar`, fd)
           
        } catch (err) {
            console.log(err)
        }

    }

    const deleteUser = async () => {
        try {
            const res = await axios.post(`${API_URL}/users/delete`)

            dispatch({
                type: DELETE_USER,
                payload: res.data
            })
            
            localStorage.setItem('token', '')

        } catch (err) {
           
            return err.response.data
        }
    }    
    
    const loginUser = async (data) => {
        
        try {
            const res = await axios.post(`${API_URL}/users/login`, data)
            
            localStorage.setItem('token', res.data.token)   
            
            setAuthToken()   
            
            dispatch({
                type: LOGIN_USER,
                payload: res.data.user
            })

        } catch (err) {
            return err.response.data
        }
    }
    
    const logoutUser = async () => {
        
        try {
            await axios.post(`${API_URL}/users/logout`)
            localStorage.setItem('token', '')   
            setAuthToken()   
            
            dispatch({
                type: LOGOUT_USER
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <UserContext.Provider
        value={{
            users: state.users,
            user: state.user,
            addUser,
            deleteUser,
            loginUser,
            logoutUser,
            loadUser,
            getUsers,
            uploadAvatar
        }}
        >
        {props.children}
        </UserContext.Provider>
    )
}

export default UserState
