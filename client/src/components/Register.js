import React from 'react'

const Register = () => {
     return (
         <div>
            <h2>Would you like to register?</h2>
         <form>
         <label>Name</label>
            <input type="text/html" name="name" placeholder="Enter name"/>
            <label>E-mail</label>
            <input type="text/html" name="email" placeholder="Enter e-mail"/>
            <label>Password</label>
            <input type="text/html" name="password" placeholder="Enter password"/>        
            <button>Submit</button>
         </form>
         </div>)
}

export default Register