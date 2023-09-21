import React, { useEffect, useState } from "react";
import { getAnimals } from "../api/petfinder_api";
import Navbar from "./components/Navbar";
import PetList from "./components/PetList";
import PetProfile from "./components/PetProfile";
import ConfirmationModal from "./components/ConfirmationModal";
import PetDetails from "./components/PetDetails";
import Favorites from "./components/Favorites";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdoptionForm from "./components/AdoptionForm";
import PendingApplications from "./components/PendingApplications";
import Object from "./components/Object";

export default function App() {
  const [animals, setAnimals] = useState([]);
  const [selectedPets, setSelectedPets] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [pendingAdoptionPets, setPendingAdoptionPets] = useState([]);
  const [applications, setApplications] = useState([]);

  const updateApplications = (newApplications) => {
    setApplications(newApplications);
  };

  useEffect(() => {
    async function fetchAnimalsWithToken() {
      try {
        const data = await getAnimals();
        setAnimals(data.animals);
      } catch (error) {
        console.error("Error:", error);

        if (error.response && error.response.status === 401) {
          await getAnimals();
          fetchAnimalsWithToken();
        }
      }
    }

    fetchAnimalsWithToken();
  }, []);

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserLocation((prevUserLocation) => ({
      ...prevUserLocation,
      [name]: value,
    }));
  };

  const handlePetSelect = (animal) => {
    const isAnimalSelected = selectedPets.some(
      (selectedPet) => selectedPet.id === animal.id
    );

    if (isAnimalSelected) {
      setSelectedPets((prevSelectedPets) =>
        prevSelectedPets.filter((selectedPet) => selectedPet.id !== animal.id)
      );
    } else {
      setSelectedPets((prevSelectedPets) => [...prevSelectedPets, animal]);
    }
  };

  const handleEmailSubmit = () => {
    // Send selected pets and user information to an API for email processing
    // You might need to make a POST request to your server with this data
    // After successful submission, you can clear the selectedPets state
    // and optionally display a confirmation message to the user
  };

  const handleAddToFavorites = () => {
    const updatedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const combinedFavorites = [...updatedFavorites, ...selectedPets];
    localStorage.setItem("favorites", JSON.stringify(combinedFavorites));
    setSelectedPets([]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Link to="/favorites">Go to Favorites</Link>
        <Link to="/pending-applications">View Pending Applications</Link>
        <Routes>
          <Route
            path="/"
            element={
              <PetList
                pets={animals}
                onPetSelect={handlePetSelect}
                pendingAdoptionPets={pendingAdoptionPets}
                applications={applications}
                updateApplications={updateApplications}
              />
            }
          />
          <Route path="/object" element={<Object animals={animals} />} />
          <Route path="/dog/:id" element={<PetProfile />} />
          <Route path="/dog/id/detail" element={<PetDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/pending-applications"
            element={<PendingApplications pendingApplications={applications} updateApplications={updateApplications} />}
          />
          <Route
            path="/pending-applications"
            element={
              <AdoptionForm
                onSubmit={updateApplications}
                applications={applications}
              />
            }
          />
        </Routes>
        <ConfirmationModal />
      </div>
    </Router>
  );
}

{
  /* <h3>Donations Form</h3>
        <button onClick={openDonationsForm}>Open Donation Form</button>
      {isDonationsFormOpen && (
        <Donations 
        onSubmit={(formData) =>{
          console.log(formData);
          closeDonationsForm();        }}
        onClose={closeDonationsForm}
        currentDonations={currentDonations} />
      )} */
}
