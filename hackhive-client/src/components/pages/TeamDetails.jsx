import React from 'react';
import TeamsList from '../Teams/TeamsList.jsx';

const TeamDetailsPage = () => {
  // Simulate a team object
  const team = {
    id: 1,
    name: 'Awesome Team',
    members: ['Member 1', 'Member 2'],
    // Add more team details as needed
  };

  return (
    <div>
      <h2>Team Details</h2>
      <TeamsList team={team} />
    </div>
  );
};

export default TeamDetailsPage;