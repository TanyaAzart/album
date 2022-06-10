import {
    ADD_ALBUM,
    REMOVE_ALBUM,
    EDIT_ALBUM
} from './types'

const albumReducer = (state, action)=>{
    switch (action.type){
        case ADD_ALBUM:
            return {
                ...state,
                albums: state.albums.concat(action.payload)
            }
        case REMOVE_ALBUM:
            return {
                ...state,
                albums: state.albums.filter(album => album.id !==action.payload)
            }
        case EDIT_ALBUM:
            return {
                ...state,
                albums: action.payload
            }
        default:
                return state
    }
}

export default albumReducer