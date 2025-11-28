import React, { useState } from "react";
import API from "../../api/api";
import './AddMenu.css';

export default function AddMenu() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        image: "",
        ingredients: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...form,
                price: Number(form.price),
                ingredients: form.ingredients.split(",").map(i => i.trim())
            };

            await API.post("/menu/add", data);
            setMessage("Menu item added successfully!");

            setForm({
                name: "",
                price: "",
                category: "",
                image: "",
                ingredients: ""
            });

        } catch (err) {
            setMessage("Failed to add item!");
        }
    };

    return (
        <div className="add-menu-container">
            <h2>Add Menu Item</h2>

            {message && <p className="msg">{message}</p>}

            <form className="add-form" onSubmit={handleSubmit}>

                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <label>Price (₹)</label>
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />

                <label>Category</label>
                <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                />

                <label>Image URL</label>
                <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                />

                <label>Ingredients (comma separated)</label>
                <input
                    type="text"
                    name="ingredients"
                    value={form.ingredients}
                    onChange={handleChange}
                />

                <button className="btn add-btn" type="submit">Add Item</button>
            </form>
        </div>
    );
}
