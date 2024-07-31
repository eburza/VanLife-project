import React from "react"
import { NavLink, Link } from "react-router-dom"
import logo from "../assets/VanLife-logo.svg";


export default function Header() {
    return (
        <header className="navigation">

            <Link to="/">
                <img src={logo} alt="VanLife Logo" className="vanlife-logo" />
            </Link>

            <nav className="nav-links">
                <NavLink 
                to="/host" 
                className={({isActive}) => isActive ? "active-link" : null }
                >
                    Host
                </NavLink>
                <NavLink 
                to="/about" 
                className={({isActive}) => isActive ? "active-link" : null }                
                >
                    About
                </NavLink>
                <NavLink 
                to="/vans" 
                className={({isActive}) => isActive ? "active-link" : null }
                >
                    Vans
                </NavLink>
            </nav>
            
        </header>
    )
}