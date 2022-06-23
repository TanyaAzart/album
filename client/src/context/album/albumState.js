import React, { useReducer } from 'react'
import axios from 'axios'
import AlbumContext from './albumContext'
import AlbumReducer from './albumReducer'

import {
    GET_ALBUMS,
    ADD_ALBUM,
    DELETE_ALBUM,
    EDIT_ALBUM
} from '../types'

const AlbumState = (props) => {

    const [state, dispatch] = useReducer(AlbumReducer, {
        albums: []
    })  

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }}

    const getAlbums = async ()=> {
        try {
            const res = await axios.get('http://localhost:4000/albums')
    
            dispatch({
                type: GET_ALBUMS,
                payload: res.data
            })

        } catch(err) {
            console.log(err)
        }
    }

    const addAlbum = async (album)=> {
        
        try {
            if(!state.albums.find(item => item.title ===album.title)) {
                const res = await axios.post('http://localhost:4000/albums', album, config)
                dispatch({
                    type: ADD_ALBUM,
                    payload: res.data
                }) 
            } else {
                alert("The album already exists!")
            }             
        } catch (err) {
            console.log(err)
        }       
    }

    const editAlbum = async (album)=> {
        try {
            
            const res = await axios.post(`http://localhost:4000/albums/${album._id}`, album)

            const updatedAlbums = state.albums.filter(item=> item._id !== album._id).concat(res.data)

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
            await axios.post(`http://localhost:4000/albums/delete/${id}`)
            
            dispatch({
                type: DELETE_ALBUM,
                payload: id
            }) 
            } catch (err) {
            console.log(err)
        }        
    }

    return (
        <AlbumContext.Provider
        value={{
            albums: state.albums,
            getAlbums,
            addAlbum,
            deleteAlbum,
            editAlbum
        }}
        >
        {props.children}
        </AlbumContext.Provider>
    )
}

export default AlbumState
