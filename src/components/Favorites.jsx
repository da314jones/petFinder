import React, { useEffect, useState } from 'react';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function getFavoritesFromLocalStorage() {
    try {
      const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(favoritesFromStorage);
    } catch (error) {
      console.error('Error retrieving favorites from local storage:', error);
    }
  }

  useEffect(() => {
    getFavoritesFromLocalStorage();
  }, []);

  function removeFavorite(petId) {
    const updatedFavorites = favorites.filter((pet) => pet.id !== petId);
    setFavorites(updatedFavorites);

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite pets yet.</p>
      ) : (
        <ul>
          {favorites.map((pet) => (
            <li key={pet.id}>
              {pet.name}{" "}
              {pet.id}{" "}
              <button onClick={() => removeFavorite(pet.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      </div>
  );
}
