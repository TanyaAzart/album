import {
    ADD_USER,
    DELETE_USER,
    LOGIN_USER,
    LOGOUT_USER,
    LOAD_USER,
    GET_USERS
} from '../types'

const userReducer = (state, action)=>{
    switch (action.type){
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case ADD_USER:
            return {
                ...state,
                users: state.users.concat(action.payload),
                user: action.payload
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.email!==action.payload.email),
                user: null
            }
        case LOGIN_USER:
        case LOAD_USER:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                user: null
            }
        default:
                return state
    }
}

export default userReducer