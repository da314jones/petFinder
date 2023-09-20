import React from 'react';
import TextLoop from 'react-text-loop'; 

export default function DogDetails({ dog }) {
  return (
    <div className="dog-details">
      <h2>{dog.name}</h2>
      <img src={dog.image} alt={dog.name} />
      <p>Breed: {dog.breed}</p>
      <p>Size: {dog.size}</p>
      <p>Age: {dog.age}</p>
      <strong>Tags:</strong>
      <TextLoop>
        {dog.tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </TextLoop>
    </div>
  );
}
