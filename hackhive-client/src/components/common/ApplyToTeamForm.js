import React, { useState } from 'react';

const ApplyToTeamForm = ({ onApply }) => {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim() === '') {
      // Handle validation error
      return;
    }
    onApply({ teamName });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Apply to Team</h2>
      <label>
        Team Name:
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </label>
      <button type="submit">Apply</button>
    </form>
  );
};

export default ApplyToTeamForm;