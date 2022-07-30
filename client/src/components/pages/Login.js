import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../layouts/Modal'
import UserContext from '../../context/user/userContext'
import AlertContext from '../../context/alert/alertContext'

const Login = () => {
    const userContext = useContext(UserContext)
    const { user, loadUser, loginUser, logoutUser } = userContext

    const alertContext = useContext(AlertContext)
    const { alert, setAlert, removeAlert } = alertContext

    const navigate = useNavigate()

    useEffect(()=> {
        const token = localStorage.getItem('token')        
        
        if(token) {
            loadUser()            
        }
    },[])

    const onLogin = async (e)=> {       
            e.preventDefault()
            const data = {
                email: e.target.email.value,
                password: e.target.password.value
            }
            const res = await loginUser(data) 

            if (res==='Unable to login'){
                setAlert({
                alert: true,
                header:'AUTHENTICATION ERROR',
                text:'Unable to login!',
                yesButton: 'OK'
            })  
            } else {
                navigate('/admin')   
            }                    
    }
    
    return (<div className='ui center aligned container'>
        { alert && <Modal handleAlert={()=>removeAlert()}/>}
        {!user ? (<div>
        <h2 className='ui blue header'>Would you like to login?</h2>
        <form className='ui mini form' onSubmit={onLogin}>
            <div className='two fields'>
            <div className='field'>
                <label>E-mail</label>
                <input type="text" name="email" placeholder="Enter e-mail"/>
            </div> 
            <div className='field'>   
                <label>Password</label>
                <input type="text" name="password" placeholder="Enter password"/>
            </div>      
        </div>
            <button className='ui primary submit button'>Submit</button>              
        </form>
        <h3>Not registered?</h3>
        <h3><Link to='/register'>Register here!</Link></h3>

        </div>) : (<div>
            <h2 className='ui blue header'>Would you like to logout?</h2>       
            <button className='ui  button' onClick={logoutUser}>Logout</button>       
        </div>)}
        </div>)         
}

export default Login