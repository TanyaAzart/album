import React, { useState, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../layouts/Modal'
import UserContext from '../../context/user/userContext'
import AlertContext from '../../context/alert/alertContext'


const Register = () => {   
   const navigate = useNavigate()
   const userContext = useContext(UserContext)
   const { user, addUser, deleteUser, uploadAvatar } = userContext

   const alertContext = useContext(AlertContext)
   const { alert, setAlert, removeAlert } = alertContext

   const [ avatar, setAvatar ] = useState(null)

   const onSubmit= async (e)=> {
      e.preventDefault()
         const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
         }         
         await addUser(data)
         
         if(user === 'admin') {
            navigate('/admin')
         } else {
            navigate('/')  
         }             
   }

   const chooseAvatar = (e)=> {
      const file = e.target.files[0]
      
      setAvatar(file)
   }

   const inputRef = useRef(null)

   const onUploadAvatar = ()=> {
         uploadAvatar(avatar)
         setAlert({
            alert: true,
            text: 'Avatar uploaded!',
            yesButton: 'OK',
            noButton: null
         })
   }

   const handleAlert =()=> {
      removeAlert()
   }
   
   return (<div>
      {alert && <Modal handleAlert ={handleAlert}/>}
      {user ? (<div>
         <h2>Add Avatar to Your Account!</h2>
         <input 
            type="file" 
            style={{display: 'none'}}
            ref={inputRef}
            onChange={chooseAvatar} 
         />
         <button onClick={()=>inputRef.current.click()}>Choose File</button>
         <button onClick={onUploadAvatar}>Upload</button> 
         <h3>Would you like to delete your account?</h3>
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
      </div>)}
      </div>
      )         
}

export default Register