import React from 'react';

function PetProfile({ pet }) {
  return (
    <div className="pet-profile">
      <h2>{pet.name}</h2>
      <p>Age: {pet.age}</p>
      <p>Breed: {pet.breed}</p>
    </div>
  );
}

export default PetProfile;
