import React, { useState } from "react";
import { useUser } from "../AuthContext";
import { Link } from 'react-router-dom';
import noImage from '../assets/noImage.jpg';
import "../styles/Profile.css";

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const [userName, setUserName] = useState("Your Current Username"); // Replace with actual user data
    const { userEmail, logout } = useUser();

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    return (
        <div className="profileDiv">
            <img className="profileImage" src={noImage} alt="Avatar" />
            <div className="profileInfo">
                <p className="user">
                    Username
                </p>
                <p className="username">
                    {editMode ? (
                        <input className="username" type="text" value={userName} onChange={handleUserNameChange} />
                    ) : (
                        <span>{userName}</span>
                    )}
                </p>
                <p className="wishlist">
                    <Link to="/wishlist" >Wishlist</Link>
                </p>
                <p className="edit">
                    <span onClick={handleEditClick}>{editMode ? "Save" : "Edit"}</span>
                </p>
                
                {/* This logout button bellow should redirect to the home page */}
                <p className="logoutButton">
                    <button onClick={logout} className='log-out-button'>Logout</button>
                </p>
            </div>
        </div>
    );
};

export default Profile;