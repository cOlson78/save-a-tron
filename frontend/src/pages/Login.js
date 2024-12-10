import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../AuthContext'; 
import {Link} from 'react-router-dom';
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
    const { login } = useUser();  // Access login from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // to redirect after login

    const logSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage('Both fields are required!');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password });

            if (response.status === 201) {
                alert('Account login was successful!');
                login(email);  // Update the context with the logged-in user data
                navigate('/');  // Navigate to home page after login
            }
        } catch (error) {
            setErrorMessage(error.response?.data.error || 'Error during login, please try again!');
        }
    };

    return (
        <div className="login">
            <h1 className='loginTextHeader'>Login</h1>
            {errorMessage && <p className="login-error-message">{errorMessage}</p>}
            <form onSubmit={logSubmit}>
                <input
                    type="text"
                    className='email'
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className='password'
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className='button'>Login</button>
            </form>
            <Link to="/forgot" className='forgot'>Forgot Password?</Link>
            <Link to="/create" className='create'>Create Account?</Link>
            
        </div>
    );
};

export default Login;