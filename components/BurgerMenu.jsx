import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { logoutUser } from '../services/firebase-auth'

export default function BurgerMenu() {
    const location = useLocation()
    const navigate = useNavigate()
    const menuRef = useRef()
    const [isOpen, setIsOpen] = useState(false)

    const from = location.state?.from?.pathname || sessionStorage.getItem("lastPage") || "/"
    const isLoggedIn = localStorage.getItem("loggedin")
  
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
    
        document.addEventListener('mousedown', handleClickOutside)
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
  
    function handleLoginNavigation() {
        sessionStorage.setItem("lastPage", location.pathname)
        navigate("/login", { state: { from: location.pathname } })
    }
  
    async function handleLogout() {
        if (isLoggedIn) {
            const { error } = await logoutUser()
            if (!error) {
                localStorage.removeItem("loggedin")
                localStorage.removeItem("userId")
                localStorage.setItem("wasLoggedOut", true)
            }
        }
        navigate("/login", { state: { from: location.pathname } })
    }
  
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleMouseEnter = () => {
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        setIsOpen(false)
    }

    return (
        <div 
            className="burger-menu" 
            ref={menuRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="burger-icon" onClick={toggleMenu}>
                {isOpen ? <CloseIcon /> : <MenuIcon />}
            </div>
            {isOpen && (
                <nav className="menu-nav">
                    <Link to="/" onClick={toggleMenu}>Home</Link>
                    <Link to="/host" onClick={toggleMenu}>Host</Link>
                    <Link to="/about" onClick={toggleMenu}>About</Link>
                    <Link to="/vans" onClick={toggleMenu}>Vans</Link>
                    <br />
                    {!isLoggedIn ? (
                        <Link 
                            to="/login"
                            state={{ from: location.pathname }}
                            onClick={handleLoginNavigation}
                        >
                            <p>User Log in</p>
                        </Link>
                    ) : (
                        <Link 
                            to="/login"
                            state={{ from: location.pathname }}
                            onClick={handleLogout}
                        >
                            <p>User Log out</p>
                        </Link>
                    )}
                </nav>
            )}
        </div>
    )
}