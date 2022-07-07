import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context/user/userContext'

const Login = () => {
    const userContext = useContext(UserContext)
    const { user, loadUser, loginUser, logoutUser } = userContext

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
        await loginUser(data) 
        navigate('/admin')       
    }
    
    return (!user ? (<div>
        <h2>Would you like to login?</h2>
        <form onSubmit={onLogin}>
            <label>E-mail</label>
            <input type="text/html" name="email" placeholder="Enter e-mail"/>
            <label>Password</label>
            <input type="text/html" name="password" placeholder="Enter password"/>        
            <button>Submit</button>
        </form>
        <h3>Not registered?</h3>
        <Link to='/register'>Register here!</Link>

        </div>) : (<div>
            <h2>Would you like to logout?</h2>       
            <button onClick={logoutUser}>Logout</button>       
        </div>))         
}

export default Login