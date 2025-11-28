import React, { useEffect, useState } from 'react'
import API from '../../api/api'


export default function ManageOrders() {
    const [orders, setOrders] = useState([])
    useEffect(() => { API.get('/orders').then(res => setOrders(res.data)).catch(() => { }) }, [])


    const updateStatus = async (id, status) => {
        await API.put(`/admin/orders/status/${id}`, { status })
        setOrders(orders.map(o => o._id === id ? { ...o, status } : o))
    }


    return (
        <div>
            <h2>Manage Orders</h2>
            <table className="simple-table">
                <thead><tr><th>Order</th><th>User</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o._id}>
                            <td>{o._id}</td>
                            <td>{o.user?.name || o.user}</td>
                            <td>₹{o.totalPrice}</td>
                            <td>{o.status}</td>
                            <td>
                                <button className="btn" onClick={() => updateStatus(o._id, 'preparing')}>Preparing</button>
                                <button className="btn" onClick={() => updateStatus(o._id, 'completed')}>Delivered</button>
                                <button className="btn" onClick={() => API.put(`/admin/orders/cancel/${o._id}`).then(() => setOrders(orders.map(x => x._id === o._id ? { ...x, status: 'cancelled' } : x)))}>Cancel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}