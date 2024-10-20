import React, { useState } from "react";
import "../styles/Filters.css";

// passing the filterList as a prop
const Filters = ({filterList}) => {
  // To show more filters
  const [showMore, setShowMore] = useState(false);

  // Toggle the visibility of the extra filters
  const toggleShowMore = () => {
    setShowMore((prevState) => !prevState);
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
              <input type="checkbox" name={filter.label} value={filter.value} />
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
