// DogProfile.jsx
import React from "react";

export default function DogProfile({ dog, isSelected, onDogSelect }) {
  const { name, breed, size, age, image } = dog;

  return (
    <div className={`profile-card ${isSelected ? "selected" : ""}`}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Breed: {breed}</p>
      <p>Size: {size}</p>
      <p>Age: {age}</p>
      <button onClick={() => onDogSelect(dog.id)}>
        {isSelected ? "Deselect" : "Select"}
      </button>
    </div>
  );
}
