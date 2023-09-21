import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import PetProfile from './PetProfile';
import Notification from './Notifications';

export default function PetList({ pets }) {
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleProfileClick = (profile) => {
    const isProfileSelected = selectedProfiles.some(
      (selected) => selected.id === profile.id
    );

    const isProfileInPetList = pets.some((pet) => pet.id === profile.id);
    const isProfileInFavorites = favorites.some((fav) => fav.id === profile.id);

    if (!isProfileSelected && !isProfileInFavorites && isProfileInPetList) {
      setSelectedProfiles((prevSelected) => [...prevSelected, profile]);
    }
  };

  const saveFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify([...favorites, ...selectedProfiles]));
    setFavorites([...favorites, ...selectedProfiles]);
    setSelectedProfiles([]);

    if (selectedProfiles.length > 0) {
      const petNames = selectedProfiles.map((profile) => profile.name).join(', ');
      const petID = selectedProfiles.map((profile) => profile.id).join(', ');
      const newNotificationMessage = `${petNames} have been added to favorites.`;
      setNotificationMessage(newNotificationMessage);
      setShowNotification(true);
    }
  };

  useEffect(() => {
    if (showNotification) {
      const timeoutId = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showNotification]);

  return (
    <div className="pet-list">
      <button onClick={saveFavorites}>Save Selected as Favorites</button>
      {pets.map((pet) => (
        <div key={pet.id}>
            <PetProfile
              pet={pet}
              isSelected={selectedProfiles.some((selected) => selected.id === pet.id)}
              onPetSelect={() => handleProfileClick(pet)}
            />
                 </div>
      ))}
      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}
