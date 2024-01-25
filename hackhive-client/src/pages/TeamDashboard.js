import React from 'react';
import TeamDashboard from '../components/Teams/TeamDashboard';

const TeamDashboardPage = () => {
  // Simulate a team object
  const team = {
    id: 1,
    name: 'Awesome Team',
    members: ['Member 1', 'Member 2'],
    // Add more team details as needed
  };

  return (
    <div>
      <h2>Team Dashboard</h2>
      <TeamDashboard team={team} />
    </div>
  );
};

export default TeamDashboardPage;