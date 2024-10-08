import React from 'react';
import {Link} from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = () => {
    return (
    <nav className="navbar">  
        <div className="navbar-left nav-item">
            <Link to="/login" className='nav-login'>Login</Link>
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
            <Link to="/wishlist" className='nav-wishlist'>Wishlist</Link>
        </div>
    </nav>
    );
};

export default Navbar;