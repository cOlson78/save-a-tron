import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom';

import "../styles/Create.css";

const Create = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // to redirect after creation

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== retypePassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('/create', {
                email,
                password,
            });

            if (response.status === 201) {
                alert("Account created successfully!");
                
                navigate('/login');
            }
        } catch (error) {
            if (error.response) {
                // server responds but failed
                setErrorMessage(error.response.data.error || "Error creating account, please try again!");
            } else {
                //failed to connect to server
                console.error("Error:", error);
                setErrorMessage("Network error, please try again.");
            }
        }
    };
    return (
        <div className="createBox">
            
            <h1 className='createText'>Create Account</h1>
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className='createEmail' 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    className='createPassword' 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    className='retypePassword' 
                    placeholder="Retype Password" 
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    required
                />
                
                <button type="submit" className='createContinue'>Create Account</button>
                
            </form>
            <Link to="/login" className='forgot'>Already have an account? Log in</Link>
        </div>
    );
};

export default Create;