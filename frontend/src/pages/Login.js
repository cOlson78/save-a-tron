import React from "react";
import {Link} from 'react-router-dom';
import "../styles/Login.css";

const Login = () => {
    return (
        <div className="login">
            <h1 className='loginText'>Login</h1>
            <h3 className='loginText'>New to Save-A-Tron? Sign up now</h3>
            <input type="text" className='email' placeholder="Email Address"></input>
            <input type="password" className='password' placeholder="Password (8+ characters)"></input>
            <Link to="/forgotPassword" className='forgot'>Forgot Password?</Link>
            <button type="button" className='button'>Login</button>
        </div>
    );
};

export default Login;