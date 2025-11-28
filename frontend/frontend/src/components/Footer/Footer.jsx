import React from 'react'
import './Footer.css'


export default function Footer(){
return (
<footer className="footer">
<div>© {new Date().getFullYear()} Gourmet Hub</div>
<div>Built with ❤️</div>
</footer>
)
}