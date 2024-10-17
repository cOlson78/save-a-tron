import React from "react";
import {Link} from 'react-router-dom';
import "../styles/Reset.css";

const Reset = () => {
    return (
        <div className="resetBox">
            <h1 className='resetText'>Reset Password</h1>
            <input type="password" className='resetPassword' placeholder="Password (8+ characters)"></input>
            <input type="password" className='retypeNewPassword' placeholder="Retype Password"></input>
            <Link to="/" className='resetButton'>Reset Password</Link>
        </div>
    );
};

export default Reset;