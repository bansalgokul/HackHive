import React from 'react';
import ApplyToTeamForm from '../components/ApplyToTeamForm';

const ApplyToTeamFormPage = () => {
  const handleApplyToTeam = (formData) => {
    // Implement logic to handle applying to a team
    console.log('Applying to team:', formData);
  };

  return (
    <div>
      <h2>Apply to Team</h2>
      <ApplyToTeamForm onApply={handleApplyToTeam} />
    </div>
  );
};

export default ApplyToTeamFormPage;