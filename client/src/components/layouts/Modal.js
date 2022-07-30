import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import AlertContext from '../../context/alert/alertContext'



const Modal = ({ handleAlert })  => {

    const alertContext = useContext(AlertContext)
    const { header, text, yesButton, noButton, removeAlert } = alertContext


    return ReactDOM.createPortal(
        <div 
            onClick={()=>removeAlert()}
            className='ui dimmer modals visible active'
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className='ui standard modal visible active'
            >
                <div className='header'>{header}</div>
                <div className='content'>{text}</div>
                <div className='actions'>
                {yesButton && <button className='ui primary button' onClick={handleAlert}>{yesButton}</button>}
                {noButton && <button className='ui secondary button' onClick={()=> removeAlert()}>{noButton}</button>}

                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal
