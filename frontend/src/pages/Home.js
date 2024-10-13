import React from "react";
import Searchbar from "../components/Search";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

const Home = () => {
    // hardcoded filters list for now
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

    // hardcoded productlist for now
    const productList = [
        {
            image: "https://t.ly/VVtDM",
            name: "Product",
            price: "19.99",
            link: "https://amazon.com/"
        },
        {
            image: "https://t.ly/VVtDM",
            name: "Product",
            price: "19.99",
            link: "https://amazon.com/"
        },
        {
            image: "https://t.ly/VVtDM",
            name: "Product",
            price: "19.99",
            link: "https://amazon.com/"
        },
        {
            image: "https://t.ly/VVtDM",
            name: "Product",
            price: "19.99",
            link: "https://amazon.com/"
        },
        {
            image: "https://t.ly/VVtDM",
            name: "Product",
            price: "19.99",
            link: "https://amazon.com/"
        },
        {
            image: "https://t.ly/VVtDM",
            name: "Product",
            price: "19.99",
            link: "https://amazon.com/"
        },
        // Add more products here
      ];

    return (
        <div className="body">
            <Searchbar/>
            <div className="filter-section">
                <div className="filter-header">Filters</div>
                <Filters filterList={filters}/>
            </div>
            <ProductCard products={productList} />
           
        </div>
    );
};

export default Home;