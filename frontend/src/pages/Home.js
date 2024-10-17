import React, { useState } from "react";
import axios from "axios";
import Searchbar from "../components/Search";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

const Home = () => {
    // hard coded filters list
    const filters = {
        Brand: [
            { label: "Apple", value: "apple" },
            { label: "Adidas", value: "adidas" },
            { label: "Shein", value: "shein" },
            { label: "Nike", value: "nike" },
            { label: "Brandy", value: "brandy" },
        ],
        Color: [
            { label: "Red", value: "red" },
            { label: "Orange", value: "orange" },
            { label: "Green", value: "green" },
            { label: "Blue", value: "blue" },
            { label: "Black", value: "black" },
        ],
    };

    // To store the list of products from the scraper
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false); // State for loading

    // Function to handle the search query
    const handleSearch = async (query) => {
        setLoading(true); // Start loading screen

        try {
            const response = await axios.get(`/search?query=${query}`);
            console.log('Search results:', response.data); // Log the search results
            
            // Filter out products with null values for img, price, and title
            const filteredResults = response.data.filter((product) => {
                return product.img !== null && product.price !== null && product.title !== null;
            })
            .map((product) => {
                // Shorten title
                let shortTitle = product.title.split(",")[0];
                const titleWords = shortTitle.split(" "); // split the title into words
                    
                if (titleWords.length > 15) { // not more than 15 words
                    // If more than 15 words, cut it off at the 15th spot
                    shortTitle = titleWords.slice(0, 15).join(" ");
                }
                return { ...product, title: shortTitle };
            });

            console.log('Filtered results:', filteredResults); // Log the filtered results
            setProductList(filteredResults); // Update the product list based on filtered results
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false); // Stop loading screen after request is complete
        }

    };

    return (
        <div className="body">
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div> 
                </div>
            )}
            <Searchbar onSearch={handleSearch} />

            {productList.length > 0 && ( 
                // do not show until after a search is done
                <>
                    <div className="results-sort">
                        <p className="results-found"> 
                            {productList.length > 0
                            ? `${productList.length} results found`
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

                    <div className="filter-section">
                        <div className="filter-header">Filters</div>
                        <Filters filterList={filters} />
                    </div>
                </>
            )}
            
            <ProductCard products={productList} />
        </div>
    );
};

export default Home;
