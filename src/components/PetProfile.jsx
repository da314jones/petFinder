import React from 'react';

export default function PetProfile({ pet, isSelected, onPetSelect }) {
  const imageSrc = pet.primary_photo_cropped?.small || '';

  const handleSelectClick = () => {
    onPetSelect(pet);
  };

  return (
    <div className={`profile-card ${isSelected ? 'selected' : ''}`}>
      {imageSrc && <img src={imageSrc} alt={pet.name} />}
      <h3>{pet.name}</h3>
      <p>
        <strong>Status:</strong> {pet.status}
      </p>
      <p>Type: {pet.species}</p>
      <p>Breed: {pet.breed}</p>
      <p>Size: {pet.size}</p>
      <p>Age: {pet.age}</p>
      <p>Description: {pet.description}</p>
      <p>Attributes: {pet.attributes ? JSON.stringify(pet.attributes) : 'N/A'}</p>
      <p>Environment: {pet.environment ? JSON.stringify(pet.environment) : 'N/A'}</p>
      <button onClick={handleSelectClick}>
        {isSelected ? 'Deselect' : 'Select'}
      </button>
    </div>
  );
}
