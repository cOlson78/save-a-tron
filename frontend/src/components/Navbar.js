import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { RiArrowDropDownLine } from 'react-icons/ri';
import {Link} from 'react-router-dom';
import "../styles/Navbar.css";
import hamburgIcon from '../assets/Hamburg.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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

        
        <div ref={menuRef} className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
            <button className="dropdown-toggle" onClick={toggleMenu}>
                Menu
            </button>
            <CSSTransition
                in={isOpen}
                timeout={300}
                classNames="dropdown-animation"
                unmountOnExit
            >
                <ul className="dropdown-list"><br></br>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/wishlist">Wishlist</Link></li>
                </ul>
            </CSSTransition>
        </div>
    </nav>
    );
};

export default Navbar;