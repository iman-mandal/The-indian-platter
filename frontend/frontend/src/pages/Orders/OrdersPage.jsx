import React, { useEffect, useState } from 'react'
import API from '../../api/api'


export default function OrdersPage(){
const [orders, setOrders] = useState([])
useEffect(()=>{API.get('/orders').then(res=>setOrders(res.data)).catch(()=>{})},[])


return (
<div>
<h2>My Orders</h2>
{orders.length === 0 ? <p>No orders yet.</p> : (
<ul>
{orders.map(o => (
<li key={o._id}>{o._id} — {o.status} — ₹{o.totalPrice}</li>
))}
</ul>
)}
</div>
)
}