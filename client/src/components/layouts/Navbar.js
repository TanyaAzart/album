import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../../context/user/userContext'

const Navbar = () => {
    const userContext = useContext(UserContext)

    const { current } = userContext

    if (current && current.name==='admin') {
        return (<div className='navbar'>
        <ul>
            <li>
            <NavLink to='/'>Home</NavLink>
            </li>
            <li>
            <NavLink to='/admin'>AdminPage</NavLink>
            </li>
            <li>
            <NavLink to='/login'>Login</NavLink>
            </li>        
        </ul>        
        </div> )
    } else if (current) {
        return (<div className='navbar'>
        <ul>
            <li>
            <NavLink to='/'>Home</NavLink>
            </li>
            <li>
            <NavLink to='/register'>Register</NavLink>
            </li>
            <li>
            <NavLink to='/login'>Login</NavLink>
            </li>        
        </ul>        
    </div>) 
    } else {
        return (<div className='navbar'>
        <ul>
            <li>
            <NavLink to='/register'>Register</NavLink>
            </li>
            <li>
            <NavLink to='/login'>Login</NavLink>
            </li>        
        </ul>        
    </div>) 
    }
        
}

export default Navbar