import React, { useState, useEffect } from "react";
import { useUser } from "../AuthContext"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Wishlist.css";
import ProductCard from "../components/ProductCard";  // Assuming you want to reuse your ProductCard component

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(true);  // Loading state to show a spinner while fetching data
  const [error, setError] = useState(null);  // To capture any errors during the fetch
  const navigate = useNavigate();
  const { userEmail } = useUser();

  // redirect to login page if user is not logged in
  useEffect(() => {
    if (userEmail == null) {
      navigate("/login"); 
    }
  }, [userEmail, navigate]); 


  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/wishlist?email=${userEmail}`);
        
        // Debugging: Check the response
        //console.log('Response Data:', response.data); // Log the response to check its structure

        // Check if response.data is valid and an array
        
        setWishlistItems(response.data)

        setLoading(false);
      } catch (err) {
        setError("Failed to load wishlist items");
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userEmail]);  // Run this effect when the component is mounted or when userEmail changes

  if (loading) {
    return <p>Loading your wishlist...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="body">
    {loading && (
        <div className="loading-overlay">
            <div className="spinner"></div> 
        </div>
    )}
    

    {wishlistItems.length > 0 && ( 
        // do not show until after a search is done
        <>
            <div className="results-sort">
                <p className="results-found"> 
                    {wishlistItems.length > 0
                    ? `${wishlistItems.length} results found`
                    : "No results found"}
                </p>

                <div className="sort-dropdown">
                    <label htmlFor="sort">Sort by: </label>
                    <select id="sort">
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low</option>
                    </select>
                </div>
            </div>

            
        </>
    )}
    
    <ProductCard products={wishlistItems} />
</div>
  );
};

export default Wishlist;