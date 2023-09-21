import React from 'react'
import DogSearch from './DogSearch'
import LocationServices from './LocationServices'

export default function Navbar({ setUserLocation }) {
  return (
    <div>

      <LocationServices setUserLocation={setUserLocation} />
    </div>
  )
}
