import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Forgot.css";

const Forgot = () => {
  const [email, setEmail] = useState("");  // State for storing email
  const [errorMessage, setErrorMessage] = useState("");  // State for storing errors
  const [successMessage, setSuccessMessage] = useState("");  // State for success message
  const navigate = useNavigate();

  // Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage(""); // Clear error when user starts typing
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email
    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Simple email validation
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      // Make an API request to trigger password reset
      const response = await axios.post("http://localhost:3000/forgot", { email });

      if (response.status === 200) {
        setSuccessMessage("We have sent you instructions to reset your password.");
        setEmail("");  // Clear the email field after submission
        setErrorMessage("");  // Clear any previous error messages
      }
    } catch (error) {
      setErrorMessage("There was an issue sending the reset instructions. Please try again.");
    }
  };

  return (
    <div className="forgotBox">
      <h1 className="forgotTextHeader">Forgot Your Password?</h1>
      <h3 className="forgotText">
        Enter your email address and we will send you <br /> instructions to reset your password.
      </h3>

      {/* Display success or error message */}
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      {/* Forgot password form */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="forgotEmail"
          placeholder="Email Address"
          value={email}
          onChange={handleEmailChange}
        />
        <button type="submit" className="continue">Continue</button>
      </form>
    </div>
  );
};

export default Forgot;