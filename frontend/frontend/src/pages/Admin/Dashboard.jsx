import React from 'react'
import { Link } from 'react-router-dom'
import './Admin.css'


export default function AdminDashboard() {
    return (
        <div className="adminContainer">
            <div className="admin-grid">
                <Link to="/admin/menu" className="admin-card">Manage Menu</Link>
                <Link to="/admin/orders" className="admin-card">Manage Orders</Link>
                <Link to="/admin/users" className="admin-card">Manage Users</Link>
            </div>
        </div>
    )
}