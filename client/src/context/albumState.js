import React, { useReducer } from 'react'
import AlbumContext from './albumContext'
import AlbumReducer from './albumReducer'

import {
    ADD_ALBUM,
    REMOVE_ALBUM,
    EDIT_ALBUM
} from './types'

const AlbumState = (props) => {

    const [state, dispatch] = useReducer(AlbumReducer, {
        albums: [{
            id: '1',
            title: 'My first album',
            year: '2020',
            descr:'',
            pics: [],
            createdAt: ''
        },
        {
            id: '2',
            title: 'My second album',
            year: '2021',
            descr:'',
            pics: [],
            createdAt: ''
        },
        {
            id: '3',
            title: 'My third album',
            year: '2022',
            descr:'',
            pics: [],
            createdAt:''
        }]
    })  

    const addAlbum = (album)=> {
        // send request
       dispatch({
           type: ADD_ALBUM,
           payload: album
       })
    }

    const editAlbum = (id, album)=> {
        const updates = state.albums.filter(album => album.id !==id).concat(album)
        // send request
        dispatch({
            type: EDIT_ALBUM,
            payload: updates
        })
                 
    }  
    
    const removeAlbum = (id)=>{
        // send request

        dispatch({
            type: REMOVE_ALBUM,
            payload: id
        })
    }

    return (
        <AlbumContext.Provider
        value={{
            albums: state.albums,
            addAlbum,
            removeAlbum,
            editAlbum
        }}
        >
        {props.children}
        </AlbumContext.Provider>
    )
}

export default AlbumState
