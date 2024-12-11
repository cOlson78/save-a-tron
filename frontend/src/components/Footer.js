import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">

                <p></p>
                <p>&copy; {new Date().getFullYear()} Save-A-Tron</p>
                <Link to="/feedback" className="feedback-link">
                    Send Feedback
                </Link>

        </footer>
    );
};

export default Footer;