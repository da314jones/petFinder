import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPetById } from '../../api/petfinder_api';
import PetProfile from './PetProfile';

export default function ShowProfile() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    async function fetchPetData() {
      try {
        const petData = await getPetById(id);
        setPet(petData);
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    }

    fetchPetData();
  }, [id]);

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <PetProfile pet={pet} />
    </div>
  );
}
