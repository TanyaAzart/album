import {
    GET_ALBUMS,
    ADD_ALBUM,
    DELETE_ALBUM,
    EDIT_ALBUM,
    ADD_PICTURES,
    SET_CURRENT
} from '../types'

const albumReducer = (state, action)=>{
    switch (action.type){
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case GET_ALBUMS:
            return {
                ...state,
                albums: action.payload
            }
        case ADD_ALBUM:
            return {
                ...state,
                albums: state.albums.concat(action.payload),
                current: action.payload._id
            }
        case DELETE_ALBUM:
            return {
                ...state,
                albums: state.albums.filter(album => album._id !==action.payload),
                current: null
            }
        case EDIT_ALBUM:
            return {
                ...state,
                albums: action.payload,
                current: null
            }
        case ADD_PICTURES:
        return {
            ...state,
            albums: state.albums.filter(album => album._id !==action.payload._id).concat(action.payload)
        }
        default:
                return state
    }
}

export default albumReducer