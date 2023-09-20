import React from 'react';

export default function PetProfilePage({ pet }) {
  return (
    <div className="pet-profile-page">
      <h2>{pet.name}'s Profile</h2>
      <img src={pet.image} alt={pet.name} />
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age} years</p>
      <p>Description: {pet.description}</p>
    </div>
  );
};

