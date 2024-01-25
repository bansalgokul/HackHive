import React from 'react';
import ProfilePage from '../components/Profile/ProfilePage';
import EditProfileForm from '../components/Profile/EditProfileForm';

const ProfilePage = () => {
  
  const user = {
   
  };

  const handleEditProfile = (formData) => {
    
    console.log('Editing profile:', formData);
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <ProfilePage user={user} />
      <EditProfileForm onSubmit={handleEditProfile} />
    </div>
  );
};

export default ProfilePage;