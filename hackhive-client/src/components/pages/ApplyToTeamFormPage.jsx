import React from 'react';
import ApplyToTeamForm from '../ApplyToTeamForm.jsx';
const ApplyToTeamFormPage = () => {
  const handleApplyToTeam = (formData) => {
    
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