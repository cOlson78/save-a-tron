import React, { useState } from "react";
import "../styles/Dropdown.css";
import { Link } from 'react-router-dom';

const DropDown = ({userEmail, logout}) => {
    return (
        <div className='dropDown'>
            <ul className='dropdown-menu'>
                <li><Link to="/wishlist">Wishlist</Link></li>
                {userEmail ? (
                    <>
                        <li className='current-user'>User: {userEmail}</li>
                        <li>
                            <button onClick={logout} className='log-out-button'>Logout</button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/login" className='nav-login'>Login</Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default DropDown;