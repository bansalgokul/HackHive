import React from 'react';

const HackathonList = ({ hackathons }) => {
  return (
    <div>
      <h2>List of Hackathons</h2>
      <ul>
        {hackathons.map((hackathon) => (
          <li key={hackathon.id}>{hackathon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HackathonList;