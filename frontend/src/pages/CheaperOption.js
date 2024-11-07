import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom"
import "../styles/CheaperOption.css";

const CheaperOption = () => {
    const location = useLocation(); 
    const [product, setProduct] = useState("");

    // This useEffect is used for preselecting a product from the homepage
    useEffect(() => {
        // Check if a pre-selected value was passed via Link state
        if (location.state && location.state.product) {
          setProduct(location.state.product);
        }

    }, [location.state]);



    return (
       <div>
        <div className="product-card">
          <img className="product-image" src={product.img} alt={product.name} /> {/* Product image */}

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
          
          </div>
        </div>
    );
};

export default CheaperOption