import React from "react";
import "../styles/ProductCard.css";

const ProductCard = ({ products }) => {
  return (
    <div className="products">
    
      {products.map((product, index) => (

        <div key={index} className="product-card">
            <img className="product-image" src={product.img} alt={product.name} />

            <div className="product-text">
                <div className="product-name-price">
                    <h2 className="product-name">{product.title}</h2>
                    <h2 className="product-price">{product.price}</h2>
                </div>
                
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="product-link">
                    Visit Store
                </a>
            </div>

            <button className="cheaper-options-button">View Cheaper Options</button>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;