import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HackathonPage from './components/pages/HackathonPage.jsx';
import TeamsPage from './components/pages/TeamPage.jsx';
import CreateTeamFormPage from './components/pages/CreateTeamFormPage.jsx';
import ApplyToTeamFormPage from './components/pages/ApplyToTeamFormPage.jsx';
import TeamDashboardPage from './components/pages/TeamDashboard.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import TeamDetailsPage from './components/pages/TeamDetails.jsx';
 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/hackathons" element={<HackathonPage/>} />
        <Route path="/teams" element={<TeamsPage/>} />
        <Route path="/create-team" element={<CreateTeamFormPage/>} />
        <Route path="/apply-to-team" element={<ApplyToTeamFormPage/>} />
        <Route path="/team-dashboard" element={<TeamDashboardPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/team-details" element={<TeamDetailsPage/>} />
        </Routes>
    </Router>
  );
};

export default App;
