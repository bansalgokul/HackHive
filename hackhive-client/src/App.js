// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HackathonPage from './pages/HackathonPage';
import TeamsPage from './pages/TeamsPage';
import CreateTeamFormPage from './pages/CreateTeamFormPage';
import ApplyToTeamFormPage from './pages/ApplyToTeamFormPage';
import TeamDashboardPage from './pages/TeamDashboardPage';
import ProfilePage from './pages/ProfilePage';
import TeamDetailsPage from './pages/TeamDetailsPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/hackathons" component={HackathonPage} />
        <Route path="/teams" component={TeamsPage} />
        <Route path="/create-team" component={CreateTeamFormPage} />
        <Route path="/apply-to-team" component={ApplyToTeamFormPage} />
        <Route path="/team-dashboard" component={TeamDashboardPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/team-details" component={TeamDetailsPage} />
      </Switch>
    </Router>
  );
};

export default App;
