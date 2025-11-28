import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";

export default function EditMenu() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        image: "",
        ingredients: ""
    });

    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        loadItem();
    }, []);

    const loadItem = async () => {
        try {
            const res = await API.get(`/menu/${id}`);
            const item = res.data;

            setForm({
                name: item.name,
                price: item.price,
                category: item.category,
                image: item.image,
                ingredients: item.ingredients.join(", ")
            });
        } catch (err) {
            setMsg("Failed to load item.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedData = {
                ...form,
                price: Number(form.price),
                ingredients: form.ingredients.split(",").map(x => x.trim())
            };

            await API.put(`/menu/update/${id}`, updatedData);

            setMsg("Item updated successfully!");

            setTimeout(() => navigate("/admin/manage-menu"), 1000);

        } catch (err) {
            setMsg("Failed to update item.");
        }
    };

    return (
        <div className="edit-container">
            <h2>Edit Menu Item</h2>

            {msg && <p className="alert">{msg}</p>}

            {loading ? <p>Loading...</p> : (
                <form className="edit-form" onSubmit={handleSubmit}>

                    <label>Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />

                    <label>Price (₹)</label>
                    <input type="number" name="price" value={form.price} onChange={handleChange} required />

                    <label>Category</label>
                    <input type="text" name="category" value={form.category} onChange={handleChange} required />

                    <label>Image URL</label>
                    <input type="text" name="image" value={form.image} onChange={handleChange} />

                    <label>Ingredients (comma separated)</label>
                    <input type="text" name="ingredients" value={form.ingredients} onChange={handleChange} />

                    <button className="btn update-btn" type="submit">Update</button>
                </form>
            )}
        </div>
    );
}
