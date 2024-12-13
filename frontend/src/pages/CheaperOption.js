import React, { useState, useEffect } from "react";
import axios from "axios";
//import CheaperProductCard from "../components/CheaperProductCard";
import noImage from '../assets/noImage.jpg';
import { useLocation } from "react-router-dom"
import "../styles/CheaperOption.css";

const CheaperOption = () => {
    const location = useLocation(); 
    const [productList, setProductList] = useState([]); // list of products
    const [loading, setLoading] = useState(false); // State for loading screen
    const [product, setProduct] = useState("");

    //workaround to mimick the effect of a sticky element as the built in sticky element was not working
    useEffect(() => {
      const handleScroll = () => {
        const fixedElement = document.querySelector('.currentItemSection');
          const fixedOffset = fixedElement.offsetTop;
        
          if (window.scrollY > fixedOffset) {
            fixedElement.style.position = 'fixed';
            fixedElement.style.top = '0';
          } else {
            fixedElement.style.position = 'absolute';
            fixedElement.style.top = 'auto';
          }
      };
    
      window.addEventListener('scroll', handleScroll);
    
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    // This useEffect is used for preselecting a product from the homepage and loading the products in
    useEffect(() => {
        // Check if a pre-selected value was passed via Link state
        if (location.state && location.state.product) {
          setProduct(location.state.product);
        }

        //Set the title
        const productTitle = location.state.product.title;

        //Set the price
        const numericPrice = parseFloat(location.state.product.price.replace('$', '').split(",").join(""));
        console.log(numericPrice);
        
        //Load the items in
        loadItems(numericPrice, productTitle);

    }, [location.state]);

    // Function to load in the items
    const loadItems = async (numericPrice, productTitle) => {
      setLoading(true); // Start loading screen

      try {
          const response = await axios.get(`/search_bestbuy?query=${productTitle}&dept=""`);
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
            let curProductPriceCommas;
            let curProductPrice;

            //Get product price
            curProductPriceString = product.price;
            curProductPriceCommas = curProductPriceString.substring(1);
            curProductPrice = parseFloat(curProductPriceCommas.split(",").join(""));
            console.log(curProductPrice);

            //Return true if the price is less or if it is equal to 1 (this means that the price is above 1000 dollars)
            console.log(parseFloat(curProductPrice) < parseFloat(numericPrice) && parseFloat(curProductPrice) != 1);
            return parseFloat(curProductPrice) < parseFloat(numericPrice) && parseFloat(curProductPrice) != 1;
          });

          //Fixes product cards with invalid images, making it the placeholder image
          const resultsWithFixedImages = cheaperFilteredResults.map(product => {
            if(!product.img.endsWith('.png') && !product.img.endsWith('.jpg') && !product.img.endsWith('.jpeg') && !product.img.endsWith('webp')){
                return {
                    ...product,
                    img: noImage // Change to the noImage image
                };
            }
            console.log(product.title);
            console.log(product.img);
            return product;
          });

          console.log(resultsWithFixedImages);

          setProductList(resultsWithFixedImages);
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
          <div className="currentItemSection" >
            <h1>Current Item</h1>
            <div className="product-card-wishlist">
              <img className="product-image-wishlist" src={product.img} alt={product.name} /> {/* Product image */}

              <div className="product-text-wishlist">
                <div className="product-name-price-wishlist"> 
                  <h2 className="product-name-wishlist">{product.title}</h2> 
                  <h2 className="product-price-wishlist">{product.price}</h2> 
                </div>
              </div>
            
            </div>
          </div>

          {/* <CheaperProductCard /> */}
            <div className="compareItemSection">
              <h1>Cheaper items</h1>
              <div className="cheaperItems"> 
                  {productList.map((product, index) => (
                    <div className="product-card-cheaper">
                      <img className="product-image-wishlist" src={product.img} alt={product.name} />
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
              </div>
            </div>
        </div>
      </div>
      
    );
    
};

export default CheaperOption