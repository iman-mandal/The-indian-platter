import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import API from '../../api/api'
import './MenuPage.css'


export default function MenuPage() {
    const [items, setItems] = useState([])
    useEffect(() => { API.get('/menu').then(res => setItems(res.data)).catch(() => { }) }, [])


    return (
        <div className='menuContaner'>
            <h2>Menu</h2>
            <div className="menu-grid">
                {items.map(item => (
                    <div className="menu-card" key={item._id}>
                        <img src={item.image || '/placeholder.png'} alt={item.name} />
                        <div className="card-body">
                            <h3>{item.name}</h3>
                            <p>{item.category}</p>
                            <div className="card-foot">
                                <div className="price">₹{item.price}</div>
                                <Link to="/cart" className="btn">Add</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}