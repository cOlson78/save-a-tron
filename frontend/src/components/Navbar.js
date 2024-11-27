import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";
import Hamburg from "../assets/Hamburg.png";
import Dropdown from "./Dropdown";
import { useUser } from '../AuthContext';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const { userEmail, logout } = useUser();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openMenu && !event.target.closest('.menuIcon') && !event.target.closest('.dropDown')) {
                setOpenMenu(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenu]);

    return (
        <nav className="navbar">
            <div className="navbar-left nav-item">
                <Link to="/wishlist" className='nav-wishlist'>Wishlist</Link>
            </div>  

            <div className="navbar-center">
                <Link to="/" className='nav-login'>
                    <div className='navbar-center-content'>
                        <h1>SAVE-A-TRON</h1>
                        <p>Save a ton with save-a-tron</p>
                    </div>
                </Link>
            </div>

            <div className="navbar-right nav-item">
                  {/* If logged in, display current user */}
                {userEmail ? (
                    <div className='user-logout'>
                        <p className='current-user'>User: {userEmail}</p>
                        <button onClick={logout} className='log-out-button'>Logout</button>
                    </div>
                    
                ) : (
                    // else display log in button
                    <Link to="/login" className='nav-login'>Login</Link>
                   
                )}
            </div> 

            <div className="menuIcon">
                <img src={Hamburg} alt="Menu" onClick= {() => setOpenMenu((prev) => !prev)}/>
                {
                    openMenu && <Dropdown userEmail={userEmail} logout={logout}/>
                }
            </div>
                  
            
        </nav>
    );
};

export default Navbar;