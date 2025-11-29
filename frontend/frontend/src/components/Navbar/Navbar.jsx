import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Navbar.css'


export default function Navbar() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()


    const handleLogout = () => {
        logout()
        navigate('/')
    }


    return (
        <nav className="nav">
            <div className="nav-left">
                <Link to="/" className="brand">The Indian Platter</Link>
            </div>
            <div className="nav-right">
                <Link className='linkItem' to="/menu">Menu</Link>
                {user && <Link className='linkItem' to="/cart">Cart</Link>}
                {user && <Link className='linkItem' to="/orders">My Orders</Link>}
                {user?.role === 'admin' && <Link to="/admin/dashboard">Admin</Link>}
                {!user ? (
                    <>
                        <Link to="/register" className="btn primary small">Sign up</Link>
                    </>
                ) : (
                    <>
                        <span className="username">{user.name}</span>
                        <button onClick={handleLogout} className="logout">Logout</button>
                    </>
                )}
            </div>
        </nav>
    )
}