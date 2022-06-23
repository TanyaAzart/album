import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context/user/userContext'


const Register = () => {   
   const navigate = useNavigate()
   const userContext = useContext(UserContext)
   const { addUser, deleteUser, current } = userContext

   const onSubmit= async (e)=> {
      e.preventDefault()
         const body = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
         }         
         const user = await addUser(body)
         
         if(user.name === 'admin') {
            navigate('/admin')
         } else {
            navigate('/')  
         }           
   }
   
   return (current? (<div>
         <h2>Would you like to delete your account?</h2>
         <button onClick={deleteUser}>Delete Account</button>
         </div>) : (<div>
         <h2>Would you like to register?</h2>
         <form onSubmit ={onSubmit}>
            <label>Name</label>
            <input type="text/html" name="name" placeholder="Enter name"/>
            <label>E-mail</label>
            <input type="email" name="email" placeholder="Enter e-mail"/>
            <label>Password</label>
            <input type="text/html" name="password" placeholder="Enter password"/>        
            <button>Submit</button>
         </form>
         <h3>Already registered?</h3>
         <Link to='/login'>Login here!</Link>
      </div>))         
}

export default Register