import React, { useReducer } from 'react'
import PictureContext from './pictureContext'
import PictureReducer from './pictureReducer'

import {
    ADD_PICTURE,
    DELETE_PICTURE  
} from '../types'

const PictureState = (props)=> {
    
    const [state, dispatch] = useReducer(PictureReducer, {
      pics: []
    })

    const addPicture = (pic) => {
        
        dispatch({
            type: ADD_PICTURE,
            payload: pic
        })
    }

    const deletePicture = (pic) => {
        console.log(pic.name)

        dispatch({
            type: DELETE_PICTURE,
            payload: pic
        })
    }

    return (
        <PictureContext.Provider
        value={{
            pics: state.pics,
            addPicture,
            deletePicture
        }}
        >
        {props.children}
        </PictureContext.Provider>
    )
}

export default PictureState