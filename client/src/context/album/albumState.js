import React, { useReducer } from 'react'
import axios from 'axios'
import AlbumContext from './albumContext'
import AlbumReducer from './albumReducer'

import {
    GET_ALBUMS,
    ADD_ALBUM,
    DELETE_ALBUM,
    EDIT_ALBUM,
    ADD_PICTURES,
    GET_PICTURE,
    SET_LOADING
} from '../types'

const AlbumState = (props) => {

    const API_URL = process.env.NODE_ENV === "production"  ? "https://album-tanya-azart.herokuapp.com" : "http://localhost:4000";

    const [state, dispatch] = useReducer(AlbumReducer, {
        albums: [],
        src:'',
        loading: false
    })  

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }}

    const getAlbums = async ()=> {
        try {
            dispatch({
                type: SET_LOADING,
                payload: true
            })
            const res = await axios.get(`${API_URL}/albums`)
    
            dispatch({
                type: GET_ALBUMS,
                payload: res.data
            })

            dispatch({
                type: SET_LOADING,
                payload: false
            })

        } catch(err) {
            console.log(err)
        }
    }

    const getPicture = async (name)=> {
        try {
            dispatch({
                type: SET_LOADING,
                payload: true
            })            

            const res = await axios.get(`${API_URL}/albums/${name}`)

            dispatch({
                type: GET_PICTURE,
                payload: res.data
            })

            dispatch({
                type: SET_LOADING,
                payload: false
            })

        } catch (err) {
            console.log(err)
        }
    }

    const addAlbum = async (album)=> {
        
        try {
            if(!state.albums.find(item => item.title ===album.title)) {                
                
                const res = await axios.post(`${API_URL}/albums`, album, config)
                
                dispatch({
                    type: ADD_ALBUM,
                    payload: res.data
                }) 
                return res.data

            } else {
                alert("The album already exists!")
            }             
        } catch (err) {
            return err.message
        }       
    }

    const addPictures = async (albumId, pics)=> {

        try {
            const res = await axios.post(`${API_URL}/upload`, { albumId, pics })

            dispatch({
            type: ADD_PICTURES,
            payload: res.data
        })
        } catch (err) {
            console.log(err)
        }        
    }

    const deletePicture = async (id, pic) => {
        
        try {
           await axios.post(`${API_URL}/upload/delete`,{ id, pic } )
            
        } catch (err) {
            console.log(err)
        }
     }

    const editAlbum = async (data)=> {
        try {
            
            const res = await axios.post(`${API_URL}/albums/${data._id}`, data)

            const updatedAlbums = state.albums.filter(album => album._id !== data._id).concat(res.data)

            dispatch({
                type: EDIT_ALBUM,
                payload: updatedAlbums
            })

        } catch(err) {
            console.log(err)
        }
    }  
    
    const deleteAlbum = async (id)=>{
       try {
            dispatch({
                type: SET_LOADING,
                payload: true
            })

            await axios.post(`${API_URL}/albums/delete/${id}`)
            
            dispatch({
                type: DELETE_ALBUM,
                payload: id
            }) 

            dispatch({
                type: SET_LOADING,
                payload: false
            })
            
            } catch (err) {
            console.log(err)
        }        
    }

    return (
        <AlbumContext.Provider
        value={{
            albums: state.albums,
            src: state.src,
            loading: state.loading,
            getAlbums,
            addAlbum,
            deleteAlbum,
            editAlbum,
            addPictures,
            getPicture,
            deletePicture
        }}
        >
        {props.children}
        </AlbumContext.Provider>
    )
}

export default AlbumState
