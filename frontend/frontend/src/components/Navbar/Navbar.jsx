import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Navbar.css'


export default function Navbar(){
const { user, logout } = useContext(AuthContext)
const navigate = useNavigate()


const handleLogout = () => {
logout()
navigate('/')
}


return (
<nav className="nav">
<div className="nav-left">
<Link to="/" className="brand">Gourmet Hub</Link>
</div>
<div className="nav-right">
<Link to="/menu">Menu</Link>
{user && <Link to="/cart">Cart</Link>}
{user && <Link to="/orders">My Orders</Link>}
{user?.role === 'admin' && <Link to="/admin/dashboard">Admin</Link>}
{!user ? (
<>
<Link to="/login">Login</Link>
<Link to="/register" className="btn primary small">Sign up</Link>
</>
) : (
<>
<span className="username">{user.name}</span>
<button onClick={handleLogout} className="btn">Logout</button>
</>
)}
</div>
</nav>
)
}