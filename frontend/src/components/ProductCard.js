// ProductCard.js
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import "../styles/ProductCard.css"; 
import { useUser } from "../AuthContext"; 
import axios from "axios";

const ProductCard = ({ products }) => {
  const [wishlist, setWishlist] = useState(Array(products.length).fill(false)); 
  const { userEmail } = useUser();

  // Check if we're on the wishlist page and force all hearts to be full
  useEffect(() => {
    // Here we can check if we're on the wishlist page by window.location or by a prop
    // For simplicity, let's assume you just want to force the hearts to be filled.
    const forceFullHearts = window.location.pathname === "/wishlist";
    
    if (forceFullHearts) {
      setWishlist(Array(products.length).fill(true));  // Set all hearts to filled
    }
  }, [products]);

  const toggleWishlist = async (index) => {
    const updatedWishlist = [...wishlist];
    updatedWishlist[index] = !updatedWishlist[index];
    setWishlist(updatedWishlist);

    const product = products[index];
    const requestData = {
      userEmail, 
      productUrl: product.url,
    };

    try {
      const url = updatedWishlist[index] ? 'http://localhost:3000/' : 'http://localhost:3000/wishlist';
      await axios.post(url, requestData);
    } catch (error) {
      console.error("Error managing wishlist:", error);
    }
  };

  return (
    <div className="products">
      {products.map((product, index) => {
        const heartIcon = wishlist[index] ? "♥" : "♡";  // Heart icon based on wishlist status

        return (
          <div key={index} className="product-card">
            <img className="product-image" src={product.img} alt={product.name} />
            <span
              className={`heart-icon ${wishlist[index] ? "added" : ""}`}
              onClick={() => toggleWishlist(index)}
              aria-label={wishlist[index] ? "Remove from wishlist" : "Add to wishlist"}
            >
              {heartIcon}
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
        );
      })}
    </div>
  );
};

export default ProductCard;
