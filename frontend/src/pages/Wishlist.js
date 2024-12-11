import React, { useState, useEffect } from "react";
import { useUser } from "../AuthContext"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Wishlist.css";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]); // New state to manage wishlist status
  const navigate = useNavigate();
  const { userEmail } = useUser();

  // Toggle the product in/out of the wishlist
  const toggleWishlist = async (index) => {
    const updatedWishlist = [...wishlist]; // Create a copy of the current wishlist
    updatedWishlist[index] = !updatedWishlist[index]; // Toggle the heart icon status
    setWishlist(updatedWishlist); // Update the state with the new wishlist

    const product = wishlistItems[index]; // Get the product at the current index
    const requestData = {
      userEmail,
      productUrl: product.url, // Send the product URL to add/remove it
    };

    try {
      if (updatedWishlist[index]) {
        // If the item is added to the wishlist, send a POST request to add it
        await axios.post('http://localhost:3000/', requestData);
      } else {
        // If the item is removed from the wishlist, send a POST request to remove it
        await axios.post('http://localhost:3000/wishlist', requestData);
      }
    } catch (error) {
      console.error("Error managing wishlist:", error);
    }
  };

  // Fetch wishlist items on page load
  useEffect(() => {
    if (userEmail == null) {
      navigate("/login");
    }
  }, [userEmail, navigate]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/wishlist?email=${userEmail}`);
        setWishlistItems(response.data);
        setWishlist(new Array(response.data.length).fill(true)); // Set all hearts to filled if items are loaded
        setLoading(false);
      } catch (err) {
        setError("Failed to load wishlist items");
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userEmail]);



  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="body">
      <ProductCard
        products={wishlistItems}
        forceFullHearts={true} // Force all hearts to be filled for wishlist page
        toggleWishlist={toggleWishlist} // Pass toggle function to ProductCard
        wishlist={wishlist} // Pass wishlist state to ProductCard
      />
    </div>
  );
};

export default Wishlist;