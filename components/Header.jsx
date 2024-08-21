import React from "react"
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom"
import logo from "../assets/VanLife-logo.svg"
import { RxAvatar } from "react-icons/rx"

export default function Header() {

    const navigate = useNavigate()
    const location = useLocation()
/*
    function handleLogout() {
        const isLoggedIn = localStorage.getItem("loggedin");
    
        if (isLoggedIn) {
            localStorage.removeItem("loggedin");
            localStorage.setItem("wasLoggedOut", true);
        }
        navigate("/login");
    }
*/
    function handleLoginNavigation() {
        sessionStorage.setItem("lastPage", location.pathname)
        navigate("/login", { state: { from: location.pathname } })
    }

    const isLoggedIn = localStorage.getItem("loggedin")

    function handleLogout() {
        if (isLoggedIn) {
            localStorage.removeItem("loggedin")
            localStorage.setItem("wasLoggedOut", true)
        }
        navigate("/login", { state: { from: location.pathname } })
    }

    console.log("Current location:", location.pathname)

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
                    <NavLink 
                        to={isLoggedIn ? "/host" : "/login"} 
                        className={({ isActive }) => isActive ? "active-link" : null }
                        state={{ from: location.pathname }}
                        onClick={handleLoginNavigation}
                    >
                        <RxAvatar className="dropdown-avatar" />
                    </NavLink>
                    <div className="dropdown-menu">
                        {!isLoggedIn ? (
                            <Link 
                                to="/login"
                                state={{ from: location.pathname }}
                                onClick={handleLoginNavigation}
                            >
                                <p>Log in</p>
                            </Link>
                        ) : (
                            <p onClick={handleLogout}>Log out</p>
                        )}
                    </div>
                </div>
            </nav>
            
        </header>
    )
}