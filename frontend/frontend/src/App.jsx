import React from 'react'
import AppRouter from './router/AppRouter'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import './App.css';

function App() {
    return (
        <div className="app-root">
            <Navbar />
            <main className="container">
                <AppRouter />
            </main>
            <Footer />
        </div>
    )
}


export default App
