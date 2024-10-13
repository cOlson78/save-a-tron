import React, { useState } from "react";
import "../styles/Filters.css";

// passing the filterList as a prop
const Filters = ({filterList}) => {
  // To show more filters
  const [showMore, setShowMore] = useState(false);

  // Toggle the visibility of the extra filters
  const toggleShowMore = (category) => {
    setShowMore((prevState) => ({
        ...prevState, // Keep previous state values for other categories
        [category]: !prevState[category], // Toggle the value for the current category
    }));
  };


  return (
    <div className="filters">
     
     {/* Loop through each category in the filters list  */}
     {Object.keys(filterList).map((category) => {
        const filters = filterList[category]; // Get the list of filters for the current category
        const visibleFilters = showMore[category]
          ? filters // If "Show more" is toggled on, show all filters
          : filters.slice(0, 3); // else, show only the first 3 filters

        return (
          <div key={category} className="filter-category">
            {/* Display the category name */}
            <div className="filter-category-header">{category}</div>

            {/* Show filters for each category*/}
            {visibleFilters.map((filter, index) => (
              <div className="filter-item" key={index}>
                <label>
                  <input type="checkbox" name={filter.label} value={filter.value} />
                  {filter.label}
                </label>
              </div>
            ))}

            {/* Show button if there are more than 3 filters */}
            {filters.length > 3 && (
              <button
                onClick={() => toggleShowMore(category)} 
                className="show-more-btn">
                {showMore[category] ? "Show less" : "Show more"} {/* Display button label based on toggle state */}
              </button>
            )}
          </div>
         
        );
      })}
    </div>
  );
};

export default Filters;
