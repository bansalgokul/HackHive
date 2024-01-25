import React from 'react';

const SortFilter = ({ handleSort, handleFilter }) => {
  return (
    <div>
      <label>
        Sort by:
        <select onChange={(e) => handleSort(e.target.value)}>
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>
      </label>
      <label>
        Filter by:
        <select onChange={(e) => handleFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="ongoing">Ongoing</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </label>
    </div>
  );
};

export default SortFilter;