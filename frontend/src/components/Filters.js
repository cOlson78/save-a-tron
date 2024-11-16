import React, { useState, useEffect } from "react";
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

  const [colNumbers, setColNumbers] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 400) {
        setColNumbers(2);
      } else if (screenWidth < 700){
        setColNumbers(3);
      } else if (screenWidth < 1250){
        setColNumbers(4);
      } else if (screenWidth < 1500){
        setColNumbers(5);
      } else if (screenWidth < 1700) {
        setColNumbers(6);
      } else if (screenWidth < 2000) {
        setColNumbers(7);
      } else if (screenWidth < 2300) {
        setColNumbers(8);
      } else if (screenWidth < 2600) {
        setColNumbers(9);
      } else if (screenWidth < 2900) {
        setColNumbers(10);
      } else {
        setColNumbers(11);
      }
    };
  
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on mount
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const columns = Math.ceil(filterList.length / colNumbers);

  const tableFilters = Array.from({ length: columns }, (_, colIndex) =>
    filterList.slice(colIndex * colNumbers, (colIndex + 1) * colNumbers)
  );

  const visibleFilters = showMore ? filterList : filterList.slice(0, (colNumbers * 3)); // Show only first 3 filters

  return (
    <div className="filters">
      <div className="filter-category">
        {/* Display the category name  */}
        <div className="filter-category-header">Brands</div>

        {/* Show filters for the brands */}
        <table>
          <tbody>
            {tableFilters.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((filter, colIndex) => (
                  <td key={colIndex}>
                    {visibleFilters.includes(filter) && (
                      <label>
                      <input type="checkbox" name={filter.label} value={filter.value} 
                      checked={selectedFilters.includes(filter.value)} // Track checkbox state
                      onChange={() => handleBrandSelection(filter.value)} // Handle change
                      />
                      {filter.label}
                      </label>
                    )}
                  </td>
                ))}    
              </tr>
            ))}
          </tbody>
        </table>

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
