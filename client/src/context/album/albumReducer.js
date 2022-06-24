import {
    GET_ALBUMS,
    ADD_ALBUM,
    DELETE_ALBUM,
    EDIT_ALBUM
} from '../types'

const albumReducer = (state, action)=>{
    switch (action.type){
        case GET_ALBUMS:
            return {
                ...state,
                albums: action.payload
            }
        case ADD_ALBUM:
            return {
                ...state,
                albums: state.albums.concat(action.payload)
            }
        case DELETE_ALBUM:
            return {
                ...state,
                albums: state.albums.filter(album => album._id !==action.payload)
            }
        case EDIT_ALBUM:
            return {
                ...state,
                albums: action.payload
            }
        // case GET_ALBUM:
        //     return {
        //         ...state,
        //         album: action.payload
        //     }
        default:
                return state
    }
}

export default albumReducer