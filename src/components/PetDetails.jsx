import React from "react";

export default function PetDetails({ details }) {
  if (!details || !details.photos || !Array.isArray(details.photos)) {
    return null;
  }

  return (
    <div className="dog-details">
      <h4>More photos of {details.name}</h4>
      <ul>
        {details.photos.map((photo, photoIndex) => (
          <li key={photoIndex}>
            <img
              src={photo.medium}
              alt={`Details Photo ${photoIndex + 1}`}
            />
          </li>
        ))}
      </ul>
      <h4>Address</h4>
      <ul>
        <li>
          <strong>Status Changed At:</strong> {details.status_changed_at}
        </li>
        <li>
          <strong>Published At:</strong> {details.published_at}
        </li>
        <li>
          <strong>Distance:</strong> {details.distance}
        </li>
        <li>
          <strong>Email:</strong> {details.contact.email}
        </li>
        <li>
          <strong>Phone:</strong> {details.contact.phone}
        </li>
        <li>
          <strong>City:</strong> {details.contact.address.city}
        </li>
        <li>
          <strong>State:</strong> {details.contact.address.state}
        </li>
        <li>
          <strong>Postcode:</strong> {details.contact.address.postcode}
        </li>
        <li>
          <strong>Country:</strong> {details.contact.address.country}
        </li>
      </ul>
      <h4>Tags</h4>
      <ul>
        {details.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
      <h4>Videos</h4>
      <ul>
        {details.videos.map((video, videoIndex) => (
          <li key={videoIndex}>
            <a href={video}>Video {videoIndex + 1}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
