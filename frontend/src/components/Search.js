import React, { useState, useEffect } from 'react';
import searchIcon from '../assets/search-icon.png';
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import "../styles/Search.css";
import RecordAudio from './RecordAudio';
import { categories } from "../constants";

const Search = ({ onSearch }) => {
    // State for capturing the search query
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [suggestions, setSuggestions] = useState([]);
    const [whisperText, setWhisperText] = useState("Use the microphone to record audio");

    // Function to handle the search
    const handleSearch = () => {
        if (onSearch && query.trim()) {
            onSearch(query, selectedCategory);  // Pass the query to the parent component (Home.js)
        }
    };

    const handleAudioSearch = () => {

        //If the whisperText is valid, search using it. Otherwise, show one of these error messages.
        if(whisperText !== "Use the microphone to record audio" && whisperText !== "Error transcribing audio" && whisperText !== "Transcribing audio..."){
            onSearch(whisperText, selectedCategory);
        } else if (whisperText === "Transcribing audio...") {
            alert("Please wait until transciption is complete");
        } else if (whisperText === "Use the microphone to record audio"){
            alert("Please use the microphone to record audio");
        } else {
            alert("Please try recording again")
        }
    }

    const handleAudio = (transcribed_result) => {
        console.log(transcribed_result);
        setWhisperText(transcribed_result);
    }


    useEffect(() => {
        if (query) {
            axios
                .get(`/suggest?term=${query}`)
                .then((response) => setSuggestions(response.data))
                .catch((error) => console.error("Error fetching keywords:", error));
        } else {
            setSuggestions([]);
        }
    }, [query]);

    return (
        <div className="full-container">
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


                <Autocomplete
                    freeSolo
                    options={suggestions}
                    onInputChange={(e, newInputValue) => setQuery(newInputValue)}
                    className='search-input-container'
                    onChange={(event, value) => {
                        if (value) {
                            setQuery(value);
                            handleSearch(value);
                        }
                    }}
                    renderInput={(params) => 
                    
                        <>
                            <TextField 
                                {...params} 
                                className='search-input'
                                placeholder='What are you looking for today?' 
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch(query);
                                    }
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {params.InputProps.endAdornment}
                                        
                                           
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </>
                    }
                />
            

                <div className='search-icon-container' onClick={handleSearch}>
                    <img className='search-icon' alt='Search Icon' src={searchIcon}/>
                </div>
            </div>
            <div className="WAIsection">
                <div className="WAItextSection">
                    {whisperText} 
                </div>
                <div className="microphoneDiv">
                    <RecordAudio onFinish={handleAudio} />
                </div>
                <div className='search-icon-container' onClick={handleAudioSearch}>
                    <img className='search-icon' alt='Search Icon' src={searchIcon}/>
                </div>
            </div>
        </div>
    );
};

export default Search;

