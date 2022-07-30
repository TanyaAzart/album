import React, { useState, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../layouts/Modal'
import UserContext from '../../context/user/userContext'
import AlertContext from '../../context/alert/alertContext'
import { set } from 'mongoose'


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
      const res = await addUser(data)

      if(res && res.indexOf('validation failed')!==-1){
         setAlert({
            alert: true,
            header: 'REGISTRATION FAILED',
            text: 'User validation failed!',
            yesButton: 'OK'
         }) 
      } else if (res && res.indexOf('duplicate key error')!==-1){
         setAlert({
            alert: true,
            header: 'REGISTRATION FAILED',
            text: 'This email has already been registered!',
            yesButton: 'OK'
         })
            
      } else {
         if(user === 'admin') {
            navigate('/admin')
         } else {
            navigate('/')  
         }   
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
            header: 'SUCCESS',
            text: 'Avatar uploaded!',
            yesButton: 'OK'
         })
   }

   const onDeleteUser =()=> {
      deleteUser()
      
      setAlert({
         alert: true,
         header:'SUCCESS',
         text: 'User deleted!',
         yesButton: 'OK'
      })
   }
   
   return (<div className='ui center aligned container'>
      {alert && <Modal handleAlert ={()=>removeAlert()}/>}
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
         <button onClick={onDeleteUser}>Delete Account</button>
         </div>) : (<div>
         <h2 className='ui blue header'>Would you like to register?</h2>
         <form className='ui mini form' onSubmit ={onSubmit}>
         <div className='three fields'>
            <div className='field'>
            <label>Name</label>
               <input type="text" name="name" placeholder="Enter name"/>
            </div>
         <div className='field'>
         <label>E-mail</label>
            <input type="email" name="email" placeholder="Enter e-mail"/>
         </div>
         <div className='field'>
         <label>Password</label>
            <input type="text" name="password" placeholder="Enter password"/>    
         </div>
         </div>                
            <button className='ui primary submit button'>Submit</button>
         </form>
         <h3>Already registered?</h3>
         <h3><Link to='/login'>Login here!</Link></h3>
        
      </div>)}
      </div>
      )         
}

export default Register