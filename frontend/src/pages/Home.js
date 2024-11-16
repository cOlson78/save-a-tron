import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "../components/Search";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

const Home = () => {
   
    // To store the list of products from the scraper
    const [productList, setProductList] = useState([]); // list of products
    const [initialProductList, setInitialProductList] = useState([]); // to store the initial relevance sort order
    const [loading, setLoading] = useState(false); // State for loading screen
    const [brandFilters, setBrandFilters] = useState([]); // automatically populate the filters based on the search
    const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products based on brand selected
    const [selectedBrands, setSelectedBrands] = useState([]); // Track selected brands
    const [selectedSortValue, setSelectedSortValue] = useState("lowToHigh"); // default sort

    // Handle Sorting
    const handleSort = (sortValue, products = filteredProducts) => {
        setSelectedSortValue(sortValue); // Update sort selection

        let sortedProducts;

        switch (sortValue) {
            case "lowToHigh":
                sortedProducts = [...products].sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
                break;
            case "highToLow":
                sortedProducts = [...products].sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
                break;
            case "asc":
                sortedProducts = [...products].sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "desc":
                sortedProducts = [...products].sort((a, b) => b.title.localeCompare(a.title));
                break;
            default: // Relevance (original order of the products)
                if(initialProductList.length == 0) {
                    sortedProducts = [...products];
                }
                else {
                    sortedProducts = [...initialProductList];
                }
                
        }

        setProductList(sortedProducts);
        setFilteredProducts(sortedProducts);
    };

    // Function to handle the search query
    const handleSearch = async (query, category) => {
        setLoading(true); // Start loading screen

        //We can delete this code later, it's only here for testing purposes
        try{
            const return_response = await axios.get(`/returning_result?query=${query}`);
        } catch (error) {
            console.error('Error fetching search query', error);
        }

        try {
            const dept = category !== "all" ? category : ""; 
            const response = await axios.get(`/search?query=${query}&dept=${dept}`);

            // Filter out products with null values for img, price, and title
            const filteredResults = response.data.filter((product) => {
                return product.img !== null && product.price !== null && product.title !== null;
            })

            // Get the list of brand filters
            const filters = filteredResults.pop(); // the last item in the list is the list of brand filters
            if (filters) {
                const brands = filters.map(brand => ({ label: brand, value: brand.toLowerCase() }));
                setBrandFilters(brands); // Update brand filters
            }

            setInitialProductList(filteredResults);
            handleSort("relevance", filteredResults); // sort by relevance by default
            
    
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false); // Stop loading screen after request is complete
        }

    };

    // Effect to filter the products when the selected brand changes
    useEffect(() => {
        if (selectedBrands.length === 0) {
            setFilteredProducts(productList); // Show original results when no brands are selected
        } else {
            const filtered = productList.filter((product) =>
                selectedBrands.some((brand) => product.title.toLowerCase().includes(brand)) // check if the product title includes the selected brand
            );
            setFilteredProducts(filtered);
        }
    }, [selectedBrands, productList]);

    

    // Handle brand selection/deselection
    const handleBrandChange = (brand) => {
        setSelectedBrands((prevSelected) =>
            prevSelected.includes(brand)
                ? prevSelected.filter((b) => b !== brand) // Remove brand if already selected
                : [...prevSelected, brand] // Add brand if not selected
        );
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
                            {filteredProducts.length > 0
                            ? `${filteredProducts.length} results found`
                            : "No results found"}
                        </p>

                        <div className="sort-dropdown">
                            <label htmlFor="sort">Sort by: </label>
                            <select id="sort"
                                value={selectedSortValue} // Bind dropdown to state
                                onChange={(e) => handleSort(e.target.value)} // Handle selection change
                            >
                                <option value="relevance">Relevance</option>
                                <option value="lowToHigh">Price: Low to High</option>
                                <option value="highToLow">Price: High to Low</option>
                                <option value="asc">Name(A-Z)</option>
                                <option value="desc">Name(Z-A)</option>
                            </select>
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-header">Filters</div>
                        <Filters filterList={brandFilters} 
                        onBrandChange={handleBrandChange}/>
                    </div>
                </>
            )}
            
            <ProductCard products={filteredProducts} />
        </div>
    );
};

export default Home;
