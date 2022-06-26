import React, { useReducer } from 'react'
import axios from 'axios'
import AlbumContext from './albumContext'
import AlbumReducer from './albumReducer'

import {
    GET_ALBUMS,
    ADD_ALBUM,
    DELETE_ALBUM,
    EDIT_ALBUM,
    SET_CURRENT,
    ADD_PICTURES,
    DELETE_PICTURE
} from '../types'

const AlbumState = (props) => {

    const [state, dispatch] = useReducer(AlbumReducer, {
        albums: [],
        current: null
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

    // const getAlbum = async (id)=> {
    //     try {
    //         const res = await axios.get(`http://localhost:4000/albums/${id}`)
    
    //         dispatch({
    //             type: GET_ALBUM,
    //             payload: res.data
    //         })

    //     } catch(err) {
    //         console.log(err)
    //     }
    // }


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

    const addPictures = async (id, pics)=> {
    
        await axios.post('http://localhost:4000/upload', {id, pics})

        dispatch({
            type: ADD_PICTURES
        }) 
        
    }

    const editAlbum = async (data)=> {
        try {
            
            const res = await axios.post(`http://localhost:4000/albums/${data._id}`, data)

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
            current: state.current,
            getAlbums,
            addAlbum,
            deleteAlbum,
            editAlbum,
            addPictures
        }}
        >
        {props.children}
        </AlbumContext.Provider>
    )
}

export default AlbumState
