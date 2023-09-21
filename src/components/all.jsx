import React from 'react';

const RenderPetfinderData = ({ pets }) => {
  return (
    <div>
      <h2>Petfinder API Data</h2>
      {pets.map((animal, index) => (
        <div key={index}>
          <h3>Animal {index + 1}</h3>
          <ul>
            <li><strong>ID:</strong> {animal.id}</li>
            <li><strong>Organization ID:</strong> {animal.organization_id}</li>
            <li><strong>Type:</strong> {animal.type}</li>
            <li><strong>Species:</strong> {animal.species}</li>
            <li><strong>Name:</strong> {animal.name}</li>
            <li><strong>Description:</strong> {animal.description}</li>
            <li><strong>URL:</strong> <a href={animal.url}>{animal.url}</a></li>
            <li><strong>Age:</strong> {animal.age}</li>
            <li><strong>Gender:</strong> {animal.gender}</li>
            <li><strong>Size:</strong> {animal.size}</li>
            <li><strong>Coat:</strong> {animal.coat}</li>
            <li><strong>Status:</strong> {animal.status}</li>
            <li><strong>Status Changed At:</strong> {animal.status_changed_at}</li>
            <li><strong>Published At:</strong> {animal.published_at}</li>
            <li><strong>Distance:</strong> {animal.distance}</li>
          </ul>
          <h4>Breeds</h4>
          <ul>
            <li><strong>Primary:</strong> {animal.breeds.primary}</li>
            <li><strong>Secondary:</strong> {animal.breeds.secondary || 'N/A'}</li>
            <li><strong>Mixed:</strong> {animal.breeds.mixed ? 'Yes' : 'No'}</li>
            <li><strong>Unknown:</strong> {animal.breeds.unknown ? 'Yes' : 'No'}</li>
          </ul>
          <h4>Colors</h4>
          <ul>
            <li><strong>Primary:</strong> {animal.colors.primary || 'N/A'}</li>
            <li><strong>Secondary:</strong> {animal.colors.secondary || 'N/A'}</li>
            <li><strong>Tertiary:</strong> {animal.colors.tertiary || 'N/A'}</li>
          </ul>
          <h4>Attributes</h4>
          <ul>
            <li><strong>Spayed/Neutered:</strong> {animal.attributes.spayed_neutered ? 'Yes' : 'No'}</li>
            <li><strong>House Trained:</strong> {animal.attributes.house_trained ? 'Yes' : 'No'}</li>
            <li><strong>Declawed:</strong> {animal.attributes.declawed || 'N/A'}</li>
            <li><strong>Special Needs:</strong> {animal.attributes.special_needs ? 'Yes' : 'No'}</li>
            <li><strong>Shots Current:</strong> {animal.attributes.shots_current ? 'Yes' : 'No'}</li>
          </ul>
          <h4>Environment</h4>
          <ul>
            <li><strong>Children:</strong> {animal.environment.children ? 'Yes' : 'No'}</li>
            <li><strong>Dogs:</strong> {animal.environment.dogs ? 'Yes' : 'No'}</li>
            <li><strong>Cats:</strong> {animal.environment.cats ? 'Yes' : 'No'}</li>
          </ul>
          <h4>Tags</h4>
          <ul>
            {animal.tags.map((tag, tagIndex) => (
              <li key={tagIndex}>{tag}</li>
            ))}
          </ul>
          <h4>Photos</h4>
          <ul>
            {animal.photos.map((photo, photoIndex) => (
              <li key={photoIndex}>
                <img src={photo.medium} alt={`Animal ${index + 1} Photo ${photoIndex + 1}`} />
              </li>
            ))}
          </ul>
          <h4>Videos</h4>
          <ul>
            {animal.videos.map((video, videoIndex) => (
              <li key={videoIndex}>
                <a href={video}>Video {videoIndex + 1}</a>
              </li>
            ))}
          </ul>
          <h4>Contact</h4>
          <ul>
            <li><strong>Email:</strong> {animal.contact.email}</li>
            <li><strong>Phone:</strong> {animal.contact.phone}</li>
            <h5>Address</h5>
            <ul>
              <li><strong>City:</strong> {animal.contact.address.city}</li>
              <li><strong>State:</strong> {animal.contact.address.state}</li>
              <li><strong>Postcode:</strong> {animal.contact.address.postcode}</li>
              <li><strong>Country:</strong> {animal.contact.address.country}</li>
            </ul>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RenderPetfinderData;
