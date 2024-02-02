import React, { useState, useEffect } from 'react';
import SearchBar from "../SearchBar.jsx";
import SortFilter from "../SortFilter.jsx";
import HackathonList from "../Hackathon/HackathonList.jsx"

const HackathonPage = () => {
  const [hackathons, setHackathons] = useState(/* Initial hackathons data */);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    // Fetch hackathons data here
    // Update hackathons state
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterHackathons(term, filterBy, sortBy);
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
    filterHackathons(searchTerm, filterBy, criteria);
  };

  const handleFilter = (category) => {
    setFilterBy(category);
    filterHackathons(searchTerm, category, sortBy);
  };

  const filterHackathons = (searchTerm, filterBy, sortBy) => {
    
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <SortFilter handleSort={handleSort} handleFilter={handleFilter} />
      <HackathonList hackathons={filteredHackathons} />
    </div>
  );
};

export default HackathonPage;