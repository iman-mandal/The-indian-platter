import React, { useEffect, useState } from 'react'
import API from '../../api/api'


export default function ManageUsers() {
    const [users, setUsers] = useState([])
    useEffect(() => { API.get('/user/').then(res => setUsers(res.data)).catch(() => { }) }, [])


    return (
        <div>
            <h2>Manage Users</h2>
            <table className="simple-table">
                <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th></tr></thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.mobile}</td><td>{u.role}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}