import React, { useState } from 'react';

const TeamForm = ({ onCreateTeam }) => {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim() === '') {
      // Handle validation error
      return;
    }
    onCreateTeam({ teamName });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Team</h2>
      <label>
        Team Name:
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </label>
      <button type="submit">Create Team</button>
    </form>
  );
};

export default TeamForm;