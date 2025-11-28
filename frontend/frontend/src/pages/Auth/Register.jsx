import React, { useState } from 'react'
import API from '../../api/api'
import './Auth.css'
import { useNavigate } from 'react-router-dom'


export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await API.post('/user/signup', { name, email, mobile, password })
            navigate('/login')
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed')
        }
    }


    return (
        <div className="auth-card">
            <h2>Register</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input value={name} onChange={e => setName(e.target.value)} required />
                <label>Mobile</label>
                <input value={mobile} onChange={e => setMobile(e.target.value)} required />
                <label>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} required />
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button className="btn primary" type="submit">Sign up</button>
            </form>
        </div>
    )
}