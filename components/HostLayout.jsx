import React from "react"
import { NavLink, Outlet } from "react-router-dom" 

export default function HostLayout() {

    
    return (
        <div className="host-page">
            
        <nav className="nav-links host-nav">
            <NavLink 
            to="."
            className={({isActive}) => isActive ? "active-link" : null }
            end
            >
                Dashboard
            </NavLink>
            <NavLink 
            to="income"
            className={({isActive}) => isActive ? "active-link" : null }
            >
                Income
            </NavLink>
            <NavLink 
            to="vans"
            className={ ({isActive}) => isActive ? "active-link" : null }
            >
                Vans
            </NavLink>
            <NavLink 
            to="reviews"
            className={({isActive}) => isActive ? "active-link" : null }
            >
                Reviews
            </NavLink>
        </nav>

        <Outlet />
        </div>
    )
}