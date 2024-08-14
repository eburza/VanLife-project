import React from "react"
import { NavLink, Link, useNavigate } from "react-router-dom"
import logo from "../assets/VanLife-logo.svg";
import { RxAvatar } from "react-icons/rx";

export default function Header() {

    const navigate = useNavigate()

    function handleLogout() {
        const isLoggedIn = localStorage.getItem("loggedin");
    
        if (isLoggedIn) {
            localStorage.removeItem("loggedin");
            localStorage.setItem("wasLoggedOut", true);
        }
        navigate("/login");
    }

    return (
        <header className="navigation">

            <Link to="..">
                <img src={logo} alt="VanLife Logo" className="vanlife-logo" />
            </Link>

            <nav className="nav-links">
                <NavLink 
                to="host" 
                className={({isActive}) => isActive ? "active-link" : null }
                >
                    Host
                </NavLink>
                <NavLink 
                to="about" 
                className={({isActive}) => isActive ? "active-link" : null }                
                >
                    About
                </NavLink>
                <NavLink 
                to="vans" 
                className={({isActive}) => isActive ? "active-link" : null }
                >
                    Vans
                </NavLink>


                <div className="dropdown">
                    <RxAvatar className="dropdown-avatar"/>
                    <div className="dropdown-menu">
                        <NavLink to="login"><p href="#">Log in</p></NavLink>
                        <Link to="/login"><p onClick={handleLogout}>Log out</p></Link>
                    </div>
                </div>
            </nav>
            
        </header>
    )
}