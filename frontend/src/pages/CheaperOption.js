import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom"
import "../styles/CheaperOption.css";

const CheaperOption = () => {
    const location = useLocation(); 
    const [productList, setProductList] = useState([]); // list of products
    const [loading, setLoading] = useState(false); // State for loading screen
    const [product, setProduct] = useState("");
    const [productTitle, setProductTitle] = useState("");
    const [itemPrice, setItemPrice] = useState("");

    // This useEffect is used for preselecting a product from the homepage and loading the products in
    useEffect(() => {
        // Check if a pre-selected value was passed via Link state
        if (location.state && location.state.product) {
          setProduct(location.state.product);
        }
        if(location.state && location.state.productTitle){
          setProductTitle(location.state.productTitle);
        }

        //Set the price
        const numericPrice = parseFloat(location.state.product.price.replace('$', ''));
        console.log(numericPrice);
        setItemPrice(numericPrice);
        
        //Load the items in
        loadItems(product.title);

    }, [location.state]);

    // Function to load in the items
    const loadItems = async () => {
      setLoading(true); // Start loading screen

      try {
          const response = await axios.get(`/search?query=${product.title}&dept=""`);
          console.log('Search results:', response.data); // Log the search results

          // Filter out products with null values for img, price, and title 
          const filteredResults = response.data.filter((product) => {
            return product.img !== null && product.price !== null && product.title !== null;
          })

          // //Filters out items that are more expensive than the product
          // const cheaperFilteredResults = filteredResults.filter((product) => {
          //   //Initalize variables
          //   let curProductPriceString;
          //   let curProductPrice;

          //   //Get product price
          //   curProductPriceString = product.price;
          //   curProductPrice = parseFloat(curProductPriceString.substring(1));
          //   console.log(curProductPrice);

          //   //Return true if the price is less
          //   console.log(parseFloat(curProductPrice) < parseFloat(itemPrice));
          //   return parseFloat(curProductPrice) < parseFloat(itemPrice);
          // })

          setProductList(filteredResults);
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
          <div className="compareItemSection">
              <h1>Compared items go here</h1>
              <div className="cheaperItems"> 
                <ul>
                  {productList.map((product, index) => (
                    <li className = "cheaperListItem">{product.title} {product.price} 
                    <br></br> 
                    <a href={product.url}><img className="cheaperImage" src={product.img}></img></a></li>
                  ))}
                </ul>
              </div>
          </div>
        </div>
      </div>
    );
};

export default CheaperOption