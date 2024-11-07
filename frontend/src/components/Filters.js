import React, { useState } from "react";
import "../styles/Filters.css";

// passing the filterList as a prop
const Filters = ({filterList, onBrandChange}) => {
  // To show more filters
  const [showMore, setShowMore] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]); // Track selected brands


  // Toggle the visibility of the extra filters
  const toggleShowMore = () => {
    setShowMore((prevState) => !prevState);
  };


  // Handle brand selection
  const handleBrandSelection = (brand) => {
    const isSelected = selectedFilters.includes(brand);
    const updatedFilters = isSelected
      ? selectedFilters.filter((b) => b !== brand) // Remove if already selected
      : [...selectedFilters, brand]; // Add if not selected

    setSelectedFilters(updatedFilters);
    onBrandChange(brand); // Call parent handler with brand value
  };

  const visibleFilters = showMore ? filterList : filterList.slice(0, 3); // Show only first 3 filters

  return (
    <div className="filters">
      <div className="filter-category">
        {/* Display the category name */}
        <div className="filter-category-header">Brands</div>

        {/* Show filters for the brands */}
        {visibleFilters.map((filter, index) => (
          <div className="filter-item" key={index}>
            <label>
              <input type="checkbox" name={filter.label} value={filter.value} 
              checked={selectedFilters.includes(filter.value)} // Track checkbox state
              onChange={() => handleBrandSelection(filter.value)} // Handle change
              />
              {filter.label}
            </label>
          </div>
        ))}

        {filterList.length > 3 && (
          <button onClick={toggleShowMore} className="show-more-btn">
            {showMore ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
     
};

export default Filters;
