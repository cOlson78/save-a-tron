import React, { useState, useEffect } from "react";
import axios from "axios";
//import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom"
import "../styles/CheaperOption.css";

const CheaperOption = () => {
    const location = useLocation(); 
    const [productList, setProductList] = useState([]); // list of products
    const [loading, setLoading] = useState(false); // State for loading screen
    const [product, setProduct] = useState("");

    // This useEffect is used for preselecting a product from the homepage and loading the products in
    useEffect(() => {
        // Check if a pre-selected value was passed via Link state
        if (location.state && location.state.product) {
          setProduct(location.state.product);
        }

        //Set the title
        const productTitle = location.state.product.title;

        //Set the price
        const numericPrice = parseFloat(location.state.product.price.replace('$', ''));
        console.log(numericPrice);
        
        //Load the items in
        loadItems(numericPrice, productTitle);

    }, [location.state]);

    // Function to load in the items
    const loadItems = async (numericPrice, productTitle) => {
      setLoading(true); // Start loading screen

      try {
          const response = await axios.get(`/search?query=${productTitle}&dept=""`);
          console.log('Search results:', response.data); // Log the search results

          // Filter out products with null values for img, price, and title 
          const filteredResults = response.data.filter((product) => {
            return product.img !== null && product.price !== null && product.title !== null;
          })
          filteredResults.pop(); //Gets rid of the last element in the list (it will be invalid)

          //Filters out items that are more expensive than the product
          const cheaperFilteredResults = filteredResults.filter((product) => {
            //Initalize variables
            let curProductPriceString;
            let curProductPrice;

            //Get product price
            curProductPriceString = product.price;
            curProductPrice = parseFloat(curProductPriceString.substring(1));
            console.log(curProductPrice);

            //Return true if the price is less
            console.log(parseFloat(curProductPrice) < parseFloat(numericPrice));
            return parseFloat(curProductPrice) < parseFloat(numericPrice);
          })

          console.log(cheaperFilteredResults);

          setProductList(cheaperFilteredResults);
      } catch (error) {
          console.error('Error fetching search results:', error);
      } finally {
          setLoading(false); // Stop loading screen after request is complete
      }

    };

    return (
      <div>
        {loading && (
          <div className="loading-overlay">
              <div className="spinner">Now Loading</div> 
          </div>
        )}
        <div className="container">
          <div className="currentItemSection">
            <h1>Current Item</h1>
            <div className="product-card-wishlist">
              <img className="product-image-wishlist" src={product.img} alt={product.name} /> {/* Product image */}

              <div className="product-text-wishlist">
                <div className="product-name-price-wishlist"> 
                  <h2 className="product-name-wishlist">{product.title}</h2> 
                  <h2 className="product-price-wishlist">{product.price}</h2> 
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
          <div className="compareItemSection">
              <h1>Cheaper items</h1>
              <div className="cheaperItems"> 
                <ul>
                  {productList.map((product, index) => (
                    <div className="product-card-cheaper">
                      <img className="product-image-wishlist" src={product.img} alt={product.name} /> {/* Product image */}
        
                      <div className="product-text-wishlist">
                        <div className="product-name-price-wishlist"> 
                          <h2 className="product-name-wishlist">{product.title}</h2> 
                          <h2 className="product-price-wishlist">{product.price}</h2> 
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
                  ))}
                </ul>
              </div>
          </div>
        </div>
      </div>
    );
};

export default CheaperOption