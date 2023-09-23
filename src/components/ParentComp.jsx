import React, { useState } from 'react';
import DogSearch from './DogSearch';
import PetList from './PetList'; // Component to display the list of dogs


function ParentComp() {
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [dogs] = useState([/* Your list of dog profiles here */]);

  const handleSearch = (searchQuery) => {
    // Implement the filtering logic here
    const filteredDogs = dogs.filter((dog) =>
      dog.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDogs(filteredDogs);
  };

  return (
    <div>
      <h1>Find a Dog</h1>
      <DogSearch onSearch={handleSearch} />
      <PetList dogs={filteredDogs.length > 0 ? filteredDogs : dogs} />
    </div>
  );
}

export default ParentComp;

