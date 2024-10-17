import React from "react";
import {Link} from 'react-router-dom';
import "../styles/Login.css";

const Login = () => {
    return (
        <div className="login">
            <h1 className='loginTextHeader'>Login</h1>
            <input type="text" className='email' placeholder="Email Address"></input>
            <input type="password" className='password' placeholder="Password (8+ characters)"></input>
            <Link to="/forgot" className='forgot'>Forgot Password?</Link>
            <Link to="/create" className='create'>Create Account?</Link>
            <Link to="/" className='button'>Login</Link>
        </div>
    );
};

export default Login;