import React from "react";
import {Link} from 'react-router-dom';
import "../styles/Forgot.css";

const Forgot = () => {
    return (
        <div className="forgotBox">
            <h1 className='forgotText'>Forgot Your Password?</h1>
            <h3 className='forgotText'>Enter your email address and we will send you <br></br> instructions to reset your password</h3>
            <input type="text" className='forgotEmail' placeholder="Email Address"></input>
            <Link to="/" className='continue'>Continue</Link>
        </div>
    );
};

export default Forgot;