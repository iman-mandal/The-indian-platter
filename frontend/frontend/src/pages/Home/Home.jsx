import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'


export default function Home() {
    return (
        <div className="home-hero">
            <h1 className='title'>The Indian Platter</h1>
            <p>A Chlinary Journey Through India`s Diverse Flavors</p>
            <Link to="/menu" className="btn primary">Explore Menu</Link>
        </div>
    )
}