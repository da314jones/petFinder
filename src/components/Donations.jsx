import React, { useState } from 'react';
import "./charity.css";

export default function Donations() {
  const initialDonationData = {
    fullName: '',
    email: '',
    donationAmount: '',
    donationMethod: 'Online',
  };

  const [donationData, setDonationData] = useState(initialDonationData);
  const [donations, setDonations] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData({
      ...donationData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDonation = { ...donationData, id: Date.now() };
    const updatedDonations = [...donations, newDonation];
    setDonations(updatedDonations);
    localStorage.setItem('charityDonations', JSON.stringify(updatedDonations));
    setDonationData(initialDonationData);
  };

  return (
    <div className="charity-donations">
      <h2>Support Local Shelters</h2>
      <p>Choose a shelter to donate or volunteer:</p>
      <ul>
        {shelters.map((shelter) => (
          <li key={shelter.id}>
            <a
              href={shelter.donationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shelter.name}
            </a>
            - {shelter.location}
          </li>
        ))}
      </ul>

      <h2>Make a Donation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={donationData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={donationData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="donationAmount">Donation Amount:</label>
          <input
            type="number"
            id="donationAmount"
            name="donationAmount"
            value={donationData.donationAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="donationMethod">Donation Method:</label>
          <select
            id="donationMethod"
            name="donationMethod"
            value={donationData.donationMethod}
            onChange={handleChange}
          >
            <option value="Online">Online</option>
            <option value="In Person">In Person</option>
            <option value="By Mail">By Mail</option>
          </select>
        </div>

        <button type="submit">Donate</button>
      </form>

      <div>
        <h3>Donation History</h3>
        <ul>
          {donations.map((donation) => (
            <li key={donation.id}>
              <div>
                <strong>Full Name:</strong> {donation.fullName}
              </div>
              <div>
                <strong>Email:</strong> {donation.email}
              </div>
              <div>
                <strong>Amount:</strong> ${donation.donationAmount}
              </div>
              <div>
                <strong>Method:</strong> {donation.donationMethod}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
