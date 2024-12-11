import React, { useState } from "react";
import { useUser } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar.jpg';
import axios from "axios";
import "../styles/Profile.css";

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const { userEmail, logout, login } = useUser();
    const [userName, setUserName] = useState(userEmail); // Initially setting to email as username
    const navigate = useNavigate();

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };
    const handleLogout = () => {
        logout();         // Perform the logout action (e.g., clearing cookies, localStorage, etc.)
        navigate("/login"); // Navigate to the login page
      };

    // Function to handle username change on the backend
    const handleSaveClick = async () => {
        try {
            // Make a PUT or PATCH request to the backend API to update the username
            const response = await axios.put("http://localhost:3000/profile", {
                email: userEmail,
                newUsername: userName,
            });

            if (response.status === 200) {
                // Assuming the server returns the updated username
                login(userName)
                console.log("Username updated successfully.");
                setEditMode(false); // Switch off edit mode after successful update
            }
        } catch (error) {
            console.error("Error updating username:", error);
            alert("An error occurred while updating your username. Please try again.");
        }
    };

    return (
        <div className="profileDiv">
            <img className="profileImage" src={avatar} alt="Avatar" />
            <div className="profileInfo">
                <p className="user">Username</p>
                <p className="username">
                    {editMode ? (
                        <input
                            className="username"
                            type="text"
                            value={userName}
                            onChange={handleUserNameChange}
                        />
                    ) : (
                        <span>{userName}</span>
                    )}
                </p>
                <p className="wishlist">
                    <Link to="/wishlist">Wishlist</Link>
                </p>
                <p className="edit">
                    <span onClick={editMode ? handleSaveClick : handleEditClick}>
                        {editMode ? "Save" : "Edit"}
                    </span>
                </p>
                
                
                 <p className="logoutButton">
                    <button onClick={handleLogout}className="log-out-button">
                        Logout
                        
                    </button> 
                </p> 
            </div>
        </div>
    );
};

export default Profile;
