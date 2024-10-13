import React from 'react';
// import arrowDownIcon from '../assets/arrow-down.png';
import searchIcon from '../assets/search-icon.png';
import microphoneIcon from '../assets/microphone.png';
import "../styles/Search.css";

const Search = () => {
    return (
    <div className="search-bar">  
        <div className="category">
            <select>
                {/* Hardcoded dropdown list for now */}``
                <option value="all">All</option>
                <option value="skincare">Skincare</option>
                <option value="makeup">Makeup</option>
                <option value="fragrance">Fragrance</option>
            </select>
        </div>

        <div className='search-input-container'>
            <input type='text' placeholder='What are you looking for today?' className='search-input'/>
            <img className='microphone' alt='Microphone' src={microphoneIcon}/>
        </div>

        <div className='search-icon-container'>
            <img className='search-icon' alt='Search Icon' src={searchIcon}/>
        </div>
        
    </div>
    );
};

export default Search;