import React, { useState, useEffect } from 'react';
import PetProfile from './PetProfile';
import AdoptionForm from './AdoptionForm';

export default function PetList({ pets, pendingAdoptionPets, currentDonations }) {
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [isAdoptionFormOpen, setIsAdoptionFormOpen] = useState(false);

  useEffect(() => {
    const storedFormState = localStorage.getItem('pendingAdoption');
    setIsAdoptionFormOpen(storedFormState === 'true');
  }, []);
 
  
  const openAdoptionForm = () => {
    setIsAdoptionFormOpen(true);
  };

  

  const closeAdoptionForm = () => {
    setIsAdoptionFormOpen(false);
  };
 
  

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
  };

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
      <button onClick={openAdoptionForm}>Open Adoption Form</button>
      {isAdoptionFormOpen && (
        <AdoptionForm 
        onSubmit={(formData) =>{
          console.log(formData);
          closeAdoptionForm();
        }}
        onClose={closeAdoptionForm}
        pendingAdoptionPets={pendingAdoptionPets} />
      )}
       
     
    </div>
  );
}
