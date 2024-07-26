import React from "react"
import { Link } from "react-router-dom"
import logo from "../assets/VanLife-logo.svg";


export default function Header() {
    return (
        <header className="navigation">

            <Link to="/">
                <img src={logo} alt="VanLife Logo" className="vanlife-logo" />
            </Link>

            <nav className="nav-links">
                <Link to="/about" className="link">About</Link>
                <Link to="/vans" className="link">Vans</Link>
            </nav>
            
        </header>
    )
}