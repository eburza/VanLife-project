import React from "react"
import { NavLink, Outlet } from "react-router-dom" 

export default function HostLayout() {
    return (
        <div className="page">
        <nav className="nav-links">
            <NavLink 
            to="/host"
            className={({isActive}) => isActive ? "active-link" : null }
            end
            >
                Dashboard
            </NavLink>
            <NavLink 
            to="/host/income"
            className={({isActive}) => isActive ? "active-link" : null }
            >
                Income
            </NavLink>
            <NavLink 
            to="/host/vans"
            className={ ({isActive}) => isActive ? "active-link" : null }
            >
                Vans
            </NavLink>
            <NavLink 
            to="/host/reviews"
            className={({isActive}) => isActive ? "active-link" : null }
            >
                Reviews
            </NavLink>
        </nav>

        <Outlet />
        </div>
    )
}