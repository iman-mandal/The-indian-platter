import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import API from '../api/api'


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const decoded = jwtDecode(token)
                setUser({ id: decoded.id, role: decoded.role, name: decoded.name || '' })
            } catch (err) {
                console.error('Invalid token')
            }
        }
    }, [])


    const login = async (email, password) => {
        const res = await API.post('/user/login', { email, password })
        const { token, user } = res.data
        localStorage.setItem('token', token)
        setUser({ id: user._id, role: user.role, name: user.name })
        return res
    }


    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }


    const value = { user, login, logout }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}