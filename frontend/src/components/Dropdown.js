import React, { useState } from "react";
import "../styles/Dropdown.css";
import { Link } from 'react-router-dom';

const DropDown = () => {
    return (
        <div className='flex flex-col dropDown'>
            <ul className='flex flex-col gap-4'>
                <li><Link to="/wishlist">Wishlist</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </div>
    )
}

export default DropDown;