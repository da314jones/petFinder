import React from 'react';
import PetProfile from './PetProfile'; 

function SelectedPetsList({ selectedPets, onRemovePet, onClearSelection }) {
  return (
    <div>
      <h2>Selected Pets:</h2>
      <ul>
        {selectedPets.map((pet) => (
          <li key={pet.id}>
            <PetProfile pet={pet} />
            <button onClick={() => onRemovePet(pet.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={onClearSelection}>Clear Selection</button>
    </div>
  );
}

export default SelectedPetsList;
