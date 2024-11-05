import React, { useState } from 'react';
import searchIcon from '../assets/search-icon.png';
import microphoneIcon from '../assets/microphone.png';
import "../styles/Search.css";
import { categories } from "../constants";

const Search = ({ onSearch }) => {
    // State for capturing the search query
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Function to handle the search
    const handleSearch = () => {
        if (onSearch && query.trim()) {
            onSearch(query, selectedCategory);  // Pass the query to the parent component (Home.js)
        }
    };

    return (
        <div className="search-bar">  
            <div className="category">
                <select
                    value={selectedCategory}  // Bind the selectedCategory state
                    onChange={(e) => setSelectedCategory(e.target.value)}  // Update selected category
                >
                    <option value="all">All</option>
                    {/* Dynamically generate options from categories */}
                    {categories.map((category, index) => (
                        <option key={index} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='search-input-container'>
                {/* Capture user input and update the query state */}
                <input 
                    type='text' 
                    placeholder='What are you looking for today?' 
                    className='search-input'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}  // Update query state
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(query);
                        }
                    }}
                />
                <img className='microphone' alt='Microphone' src={microphoneIcon}/>
            </div>

            <div className='search-icon-container' onClick={handleSearch}>
                <img className='search-icon' alt='Search Icon' src={searchIcon}/>
            </div>
        </div>
    );
};

export default Search;
