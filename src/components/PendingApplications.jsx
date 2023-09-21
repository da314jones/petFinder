import React from 'react';

export default function PendingApplications({ pendingApplications, updateApplications }) {
    const handleCancelApplication = (applicationId) => {
        const updatedApplications = pendingApplications.filter((app) => app.id !== applicationId);
        updateApplications(updatedApplications);
    };
    console.log("Pending Applications:", pendingApplications);

    return (
        <div>
            <h3>Pending Adoption Applications</h3>
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
