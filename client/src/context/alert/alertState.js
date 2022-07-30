import React, { useReducer } from 'react'
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const AlertState = (props) => {

    const [state, dispatch] = useReducer(AlertReducer, {
        alert: false,
        header: '',
        text: '',
        yesButton: '',
        noButton: null
    })  

    const setAlert = (alertData)=> {
        
        dispatch({
            type: SET_ALERT,
            payload: alertData
        })

    }

    const removeAlert = () => {
        dispatch({
            type: REMOVE_ALERT
        })
    }

    return (
        <AlertContext.Provider
        value={{
            alert: state.alert,
            header: state.header,
            text: state.text,
            yesButton: state.yesButton,
            noButton: state.noButton,
            setAlert, 
            removeAlert
        }}
        >
        {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
