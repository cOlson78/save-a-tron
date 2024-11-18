import React, { useState } from "react"; 
import {Link} from 'react-router-dom';
import "../styles/ProductCard.css"; 
import { useUser } from "../AuthContext"; 
import axios from "axios";

const ProductCard = ({ products }) => {
  // boolean state for each product to manage wishlist status
  const [wishlist, setWishlist] = useState(Array(products.length).fill(false)); // initialize the wishlist state with false values
  const { userEmail } = useUser();

  // Function to toggle wishlist status for a product
  const toggleWishlist = async (index) => {
    const updatedWishlist = [...wishlist]; // Create a copy of the current wishlist state
    updatedWishlist[index] = !updatedWishlist[index]; // Toggle the product status
    setWishlist(updatedWishlist); // Update the state with the new wishlist
    
    // Prepare the data to send in the POST request
    const product = products[index]; // Get the product at the current index
    
    const requestData = {
      userEmail, 
      productUrl: product.url, // Send the product URL
    };
    

    try {
      // Send a POST request to the server with the user's email and product URL
      const response = await axios.post('http://localhost:3000/', requestData);
      
      // Optionally, you can handle the server's response here
      console.log(response.data); // Log server response (can be used for success message)
    } catch (error) {
      // Handle errors, e.g. if the request fails
      console.error("Error adding product to wishlist:", error);
    }
  };

  return (
    <div className="products"> 
      {products.map((product, index) => (
        <div key={index} className="product-card">
          <img className="product-image" src={product.img} alt={product.name} /> {/* Product image */}

          {/* Heart Icon for Wishlist */}
          <span
            className={`heart-icon ${wishlist[index] ? "added" : ""}`} // Class based on wishlist status
            onClick={() => toggleWishlist(index)} // Call toggle function with the current index
            aria-label={wishlist[index] ? "Remove from wishlist" : "Add to wishlist"} 
          >
            {wishlist[index] ? "♥" : "♡"} 
          </span>

          <div className="product-text">
            <div className="product-name-price"> 
              <h2 className="product-name">{product.title}</h2> 
              <h2 className="product-price">{product.price}</h2> 
            </div>
            <a
              href={product.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="product-link" 
            >
              Visit Store
            </a>
          </div>
          <Link to="/cheaper-option" state={{product:product}}>
            <button className="cheaper-options-button">View Cheaper Options</button> {/* Button for viewing cheaper options */}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductCard; // Export the component for use in other parts of the application
