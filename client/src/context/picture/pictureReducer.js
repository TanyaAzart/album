import {
    ADD_PICTURE,
    DELETE_PICTURE  
} from '../types'

const pictureReducer = (state, action)=>{
    switch (action.type){
        // case GET_USERS:
        //     return {
        //         ...state,
        //         users: action.payload
        //     }
        case ADD_PICTURE:
            return {
                ...state,
                pics: state.pics.push(action.payload)
            }
        case DELETE_PICTURE:
            return {
                ...state
            }

        default:
                return state
    }
}

export default pictureReducer