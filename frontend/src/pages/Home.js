import React, { useState } from "react";
import axios from "axios";
import Searchbar from "../components/Search";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

const Home = () => {
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

    const productList = [
        {
            img: "https://t.ly/VVtDM",
            title: "Product",
            price: "19.99",
            url: "https://amazon.com/"
        },
        {
            img: "https://t.ly/VVtDM",
            title: "Product",
            price: "19.99",
            url: "https://amazon.com/"
        },
        {
            img: "https://t.ly/VVtDM",
            title: "Product",
            price: "19.99",
            url: "https://amazon.com/"
        },
        {
            img: "https://t.ly/VVtDM",
            title: "Product",
            price: "19.99",
            url: "https://amazon.com/"
        },
        {
            img: "https://t.ly/VVtDM",
            title: "Product",
            price: "19.99",
            url: "https://amazon.com/"
        },
        {
            img: "https://t.ly/VVtDM",
            title: "Product",
            price: "19.99",
            url: "https://amazon.com/"
        },
        // Add more products here
      ];

    // const [productList, setProductList] = useState([]);

    // // Function to handle search queries
    // const handleSearch = async (query) => {
    //     try {
    //         const response = await axios.get(`path${query}`);
    //         setProductList(response.data);  // Update product list based on search results
    //     } catch (error) {
    //         console.error("Error fetching search results:", error);
    //     }
    // };

    return (
        <div className="body">
            {/* <Searchbar onSearch={handleSearch} /> */}
            <Searchbar/>
            <div className="filter-section">
                <div className="filter-header">Filters</div>
                <Filters filterList={filters} />
            </div>
            <ProductCard products={productList} />
        </div>
    );
};

export default Home;
