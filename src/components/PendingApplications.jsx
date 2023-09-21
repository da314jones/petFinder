import React from 'react';

export default function PendingApplications({ pendingApplications }) {
    const [updatedApplications, setUpdatedApplications] = useState(pendingApplications);

    const handleCancelApplication = (applicationId) => {
      const applicationIndex = updatedApplications.findIndex((app) => app.id === applicationId);
  
      if (applicationIndex !== -1) {
        const updatedApps = [...updatedApplications];
        updatedApps.splice(applicationIndex, 1);
        
        setUpdatedApplications(updatedApps);
      }

  return (
    <div>
      <h2>Pending Adoption Applications</h2>
      {pendingApplications.length === 0 ? (
        <p>No pending applications yet.</p>
      ) : (
        <ul>
          {pendingApplications.map((application) => (
            <li key={application.id}>
              <div>
                <strong>Full Name:</strong> {application.fullName}
              </div>
              <div>
                <strong>Email:</strong> {application.email}
              </div>
              <button onClick={() => handleCancelApplication(application.id)}>Cancel</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
