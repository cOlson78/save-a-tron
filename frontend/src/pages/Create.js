import React from "react";
import {Link} from 'react-router-dom';
import "../styles/Create.css";

const Create = () => {
    return (
        <div className="createBox">
            <h1 className='createText'>Create Account</h1>
            <input type="text" className='createEmail' placeholder="Email Address"></input>
            <input type="password" className='createPassword' placeholder="Password (8+ characters)"></input>
            <input type="password" className='retypePassword' placeholder="Retype Password"></input>
            <Link to="/" className='continue'>Create Account</Link>
        </div>
    );
};

export default Create;