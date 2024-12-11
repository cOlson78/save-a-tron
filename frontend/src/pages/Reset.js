import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { useUser } from '../AuthContext';
import "../styles/Reset.css";

const Reset = () => {
    const { userEmail } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [tokenValid, setTokenValid] = useState(false); // Track token validity
    const [token, setToken] = useState(null); // Store the reset token
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
   
        const queryParams = new URLSearchParams(location.search);
        const resetToken = queryParams.get('token');
        setEmail(queryParams.get('email'));
        setToken(resetToken);

        if (resetToken) {
           
            if (resetToken === 'key') {
                setTokenValid(true);
            } else {
                setErrorMessage('Invalid or expired token.');
            }
        } else {
            setErrorMessage('No token found.');
        }
    }, [location]);

    const logSubmit = async (e) => {
        e.preventDefault();

        if (!tokenValid) {
            setErrorMessage('Invalid token.');
            return;
        }

        if (!password || !retypePassword) {
            setErrorMessage('All fields are required!');
            return;
        }

        if (password !== retypePassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long!');
            return;
        }

        try {
            const user_data = { email, password, token };
            const response = await axios.post('http://localhost:3000/reset', user_data);
            if (response.status === 200) {
                alert('Password was reset successfully');
                navigate('/');  // Redirect after success
            }
        } catch (error) {
            setErrorMessage(error.response?.data.error || 'Error during password reset.');
        }
    };

    return (
        <div className="resetBox">
            <h1 className="resetText">Reset Password</h1>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {tokenValid ? (
                <form onSubmit={logSubmit}>
                    <input
                        type="password"
                        className="resetPassword"
                        placeholder="Password (8+ characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className="retypeNewPassword"
                        placeholder="Retype Password"
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}
                    />
                    <button type="submit" className="resetButton">Reset Password</button>
                </form>
            ) : (
                <p>Please wait while we validate your token...</p>
            )}
        </div>
    );
};

export default Reset;