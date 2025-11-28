import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'


export default function Home() {
    return (
        <div className="home-hero">
            <h1>Welcome to Gourmet Hub</h1>
            <p>Delicious food delivered fresh — order from our curated menu.</p>
            <Link to="/menu" className="btn primary">Explore Menu</Link>
        </div>
    )
}