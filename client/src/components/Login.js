import React from 'react'

const Login = () => {
     return (
        <div>
        <h2>Would you like to login?</h2>
        <form id="login-form">
            <label>E-mail</label>
            <input type="text/html" name="email" placeholder="Enter e-mail"/>
            <label>Password</label>
            <input type="text/html" name="password" placeholder="Enter password"/>        
            <button>Submit</button>
        </form>
        </div>)     
}

export default Login