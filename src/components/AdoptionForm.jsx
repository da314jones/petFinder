import React, { useState, useEffect } from "react";

export default function AdoptionForm({ onSubmit, onClose }) {
  const [adoption, setAdoption] = useState([]);

  const initialFormData = {
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    additionalInfo: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [applications, setApplications] = useState([]);
  console.log("Applications:", applications);

  function getAdoptionsFromLocalStorage() {
    try {
      const adoptionFromStorage =
        JSON.parse(localStorage.getItem("Adoption")) || [];
      setAdoption(adoptionFromStorage);
    } catch (error) {
      console.error("Error retrieving Adoption from local storage:", error);
    }
  }

  useEffect(() => {
    getAdoptionsFromLocalStorage();
  }, []);

  useEffect(() => {
    const savedApplications =
      JSON.parse(localStorage.getItem("adoptionApplications")) || [];
    setApplications(savedApplications);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApplication = { ...formData, id: Date.now() };
    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem(
      "adoptionApplications",
      JSON.stringify(updatedApplications)
    );
    onSubmit(updatedApplications);
    setFormData(initialFormData);
  };

  const handleCancel = (applicationId) => {
    const updatedApplications = applications.filter(
      (app) => app.id !== applicationId
    );
    setApplications(updatedApplications);
    localStorage.setItem(
      "adoptionApplications",
      JSON.stringify(updatedApplications)
    );
  };

  return (
    <div>
      <h2>Adoption Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="additionalInfo">Additional Information:</label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Saved Adoption Applications</h3>
        <ul>
          {applications.map((app) => (
            <li key={app.id}>
              {app.fullName}
              <button type="button" onClick={() => handleCancel(app)}>
                Cancel
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
