import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../../context/user/userContext'

const Navbar = () => {
    const userContext = useContext(UserContext)

    const { user } = userContext

    if (user) {
        return (<div className='ui item menu'>
        <ul>
            <li className='item'>
            <NavLink  to='/' style={{'color':'black'}}>Home</NavLink>
            </li>
            { user.name==='admin' && <li className='item'>
                <NavLink  to='/admin'>AdminPage</NavLink>
            </li>}
            { user.name!=='admin' && <li className='item'>
            <NavLink  to='/register' style={{'color':'black'}}>Register</NavLink>
            </li>}
            <li className='item'>
            <NavLink to='/login' style={{'color':'black'}}>Login</NavLink>
            </li>        
        </ul>        
        </div> )
    } else {
        return (<div className='ui item menu'>
        <ul>
            <li className='item'>
            <NavLink to='/register'>Register</NavLink>
            </li>
            <li className='item'>
            <NavLink to='/login'>Login</NavLink>
            </li>        
        </ul>        
    </div>) 
    }        
}

export default Navbar