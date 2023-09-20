import React from 'react'
import { useState, useEffect} from 'react'
import './App.css'
import DogList from './components/DogList'
import AdoptionProcess from './components/AdoptionProcess'
import CharityDonations from './components/CharityDonations'
import SupportSection from './components/SupportSection'
import DogSearch from './components/DogSearch'
import SocialMedia from './components/SocialMedia'
// import DogDetails from './components/dogDetails'
import { getAnimals } from '../api /petfinder_api'


function App() {
    const [animals, setAnimals] = useState([]);
    const [selectedPets, setSelectedPets] = useState([]);

    useEffect(() => {
      async function fetchAnimalsWithToken() {
        try {
          const data = await getAnimals();
          setAnimals(data.animals);
          setSelectedPets(animals)
        } catch (error) {
          console.error('Error:', error);
  
          if (error.response && error.response.status === 401) {
            await getAnimals(); 
            fetchAnimalsWithToken();
          }
        }
      }
  
      fetchAnimalsWithToken();
    }, []);

  return (
    <>
    <h1>Dog List</h1>
      <DogList />
      <AdoptionProcess/>
      <CharityDonations/>
      <SupportSection/>
      <DogSearch/>
      <SocialMedia/>
      {/* <DogDetails/> */}


    </>
  )
}

export default App
