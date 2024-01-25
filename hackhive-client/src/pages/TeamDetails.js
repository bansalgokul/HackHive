import React from 'react';
import TeamDetails from '../components/Hackathon/TeamDetails';

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
      <TeamDetails team={team} />
    </div>
  );
};

export default TeamDetailsPage;