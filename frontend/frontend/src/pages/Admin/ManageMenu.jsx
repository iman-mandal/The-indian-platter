import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../api/api'
import './ManageMenu.css';

export default function ManageMenu() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { fetchItems() }, [])

    const fetchItems = async () => {
        setLoading(true)
        const res = await API.get('/menu')
        setItems(res.data)
        setLoading(false)
    }

    const handleDelete = async (id) => {
        if (!confirm('Delete item?')) return
        await API.delete(`/menu/delete/${id}`)
        fetchItems()
    }

    return (
        <div className='ManageMenuContainer'>
            <div className="menu-header">
                <h2>Manage Menu</h2>
                <Link className="btn add-btn" to="/admin/menu/add">+ Add Item</Link>
            </div>

            {loading ? <p>Loading...</p> : (
                <table className="simple-table">
                    <thead>
                        <tr><th>Name</th><th>Price</th><th>Category</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {items.map(i => (
                            <tr key={i._id}>
                                <td>{i.name}</td>
                                <td>₹{i.price}</td>
                                <td>{i.category}</td>
                                <td>
                                    <Link to={`/admin/menu/edit/${i._id}`} className="btn">Edit</Link>
                                    <button className="btn danger" onClick={() => handleDelete(i._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
