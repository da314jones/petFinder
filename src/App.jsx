import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DogList from './components/DogList';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import LocationServices from './components/LocationServices';
import ConfirmationModal from './components/ConfirmationModal';
import PetProfile from './components/PetProfile';
import PetProfilePage from './components/PetProfilePage';
import './app.css'

export default function App() {
    const [selectedPets, setSelectedPets] = useState([]);
    const [userData, setUserData] = useState({
      name: '',
      email: '',
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [showSelectedPets, setShowSelectedPets] = useState(false);
  
    const handlePetSelect = (pet) => {
      setSelectedPets((prevSelectedPets) => [...prevSelectedPets, pet]);
    };
  
    const handleUserInputChange = (event) => {
      const { name, value } = event.target;
      setUserData({ ...userData, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (userData.email && userData.email.includes('@')) {
        setModalVisible(true);
      }
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };
  
    const isEmailValid = (email) => {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    };
  
    const handleEmailValidation = (email) => {
      const isValid = isEmailValid(email);
      if (isValid) {
        console.log('Email is valid:', email);
      } else {
        console.log('Email is not valid:', email);
      }
    };
  


  return (
    <Router>
      <div>
        <Navbar />
        <h1>User Input Form</h1>
        <UserForm
          userData={userData}
          isEmailValid={isEmailValid}
          handleEmailValidation={handleEmailValidation}
          handleUserInputChange={handleUserInputChange}
          handleSubmit={handleSubmit}
        />
        <LocationServices />
        <DogList handlePetSelect={handlePetSelect} />
        <Link to="/pet-profiles">
          <button onClick={() => setShowSelectedPets(true)}>Quick View</button>
        </Link>

        <Routes>
          <Route path="/pet-profiles" element={<PetProfilePage />} />
        </Routes>

        {showSelectedPets && selectedPets.length > 0 && (
          <div>
            <h2>Selected Pets</h2>
            {selectedPets.map((pet) => (
              <PetProfile key={pet.id} pet={pet} />
            ))}
          </div>
        )}
        {modalVisible && (
          <ConfirmationModal
            isOpen={modalVisible}
            onClose={closeModal}
            onConfirm={() => {
              console.log('Email sent with data:', selectedPets, userData.email);
              closeModal();
            }}
            email={userData.email}
            onEmailChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        )}
      </div>
    </Router>
  );
}
