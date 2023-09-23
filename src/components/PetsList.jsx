import React, { useEffect, useState } from 'react';
import { getPetById} from './api';

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Fetch pet data from the API
    getPetById()
      .then((data) => {
        setPets(data.animals);
      })
      .catch((error) => {
        console.error('Error fetching pet data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Pet List</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <div>
              <img src={pet.photos[0]?.medium} alt={pet.name} />
              <p>{pet.name}</p>
              {/* Add other pet details and actions here */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PetList;

