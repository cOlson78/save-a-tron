// import React from 'react';
// // import arrowDownIcon from '../assets/arrow-down.png';
// import searchIcon from '../assets/search-icon.png';
// import microphoneIcon from '../assets/microphone.png';
// import "../styles/Search.css";

// const Search = ({ onSearch }) => {
    
//     const [query, setQuery] = useState("");
    
//     const handleSearch = () => {
//         if (onSearch) {
//             onSearch(query);  // Trigger the search in the parent component
//         }
//     };
//     return (
//     <div className="search-bar">  
//         <div className="category">
//             <select>
//                 {/* Hardcoded dropdown list for now */}``
//                 <option value="all">All</option>
//                 <option value="skincare">Skincare</option>
//                 <option value="makeup">Makeup</option>
//                 <option value="fragrance">Fragrance</option>
//             </select>
//         </div>

//         <div className='search-input-container'>
//             <input type='text' placeholder='What are you looking for today?' className='search-input'/>
//             <img className='microphone' alt='Microphone' src={microphoneIcon}/>
//         </div>

//         <div className='search-icon-container'>
//             <img className='search-icon' alt='Search Icon' src={searchIcon}/>
//         </div>
        
//     </div>
//     );
// };

// export default Search;

import React, { useState } from 'react';
import searchIcon from '../assets/search-icon.png';
import microphoneIcon from '../assets/microphone.png';
import "../styles/Search.css";

const Search = ({ onSearch }) => {
    
    // State for capturing the search query
    const [query, setQuery] = useState("");

    // Function to handle the search
    const handleSearch = () => {
        if (onSearch && query.trim()) {
            onSearch(query);  // Trigger the search
        }
    };

    return (
        <div className="search-bar">  
            <div className="category">
                <select>
                    {/* Hardcoded dropdown list for now */}
                    <option value="all">All</option>
                    <option value="skincare">Skincare</option>
                    <option value="makeup">Makeup</option>
                    <option value="fragrance">Fragrance</option>
                </select>
            </div>

            <div className='search-input-container'>
                {/* Capture user input and update the query state */}
                <input type='text' placeholder='What are you looking for today?' className='search-input'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}  // Update query state
                />
                <img className='microphone' alt='Microphone' src={microphoneIcon}/>
            </div>

            <div className='search-icon-container' onClick={handleSearch}>
                {/* Click event to trigger the search */}
                <img className='search-icon' alt='Search Icon' src={searchIcon}/>
            </div>
            
        </div>
    );
};

export default Search;
