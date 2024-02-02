import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/hackathons">Hackathons</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/create-team">Create Team</Link></li>
        {/* Add more navigation links */}
      </ul>
    </nav>
  );
};

export default Navbar;