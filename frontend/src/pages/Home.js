import React, { useState } from "react";
import axios from "axios";
import Searchbar from "../components/Search";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

const Home = () => {
   
    // To store the list of products from the scraper
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false); // State for loading
    const [brandFilters, setBrandFilters] = useState([]); // automatically populate the filters based on the search

    // Function to handle the search query
    const handleSearch = async (query, category) => {
        setLoading(true); // Start loading screen

        try {
            const dept = category !== "all" ? category : ""; 
            const response = await axios.get(`/search?query=${query}&dept=${dept}`);

            console.log(`the query is ${query} and dept is ${dept}`);
            console.log('Search results:', response.data); // Log the search results
            
            // Filter out products with null values for img, price, and title
            const filteredResults = response.data.filter((product) => {
                return product.img !== null && product.price !== null && product.title !== null;
            })

            console.log('Filtered results:', filteredResults); // Log the filtered results

            // Get the list of brand filters
            const filters = filteredResults.pop(); // the last item in the list is the list of filters
            if (filters) {
                const brands = filters.map(brand => ({ label: brand, value: brand.toLowerCase() }));
                setBrandFilters(brands); // Update brand filters
                console.log(brands);
            }

           

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
                        <Filters filterList={brandFilters} />
                    </div>
                </>
            )}
            
            <ProductCard products={productList} />
        </div>
    );
};

export default Home;
