import React from 'react';
import { UilSearch, UilMapMarker } from '@iconscout/react-unicons';
import { useState } from 'react';
// Definindo barra para pesquisar as cidades
function Inputs({setQuery, units, setUnits}) {
  const [city, setCity] = useState("");

  const handUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name
    if (units !== selectedUnit) setUnits(selectedUnit);
  }

  const handSearchClick = () => {
    if (city !== '') setQuery({q: city})
  }

  const handLocationClick = () => {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({
          lat, 
          lon,
        })
      })
    }
  }
  return(
  <div className="flex flex-row justify-center my-6">
    <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input 
        value={city}
        onChange={(e) =>setCity(e.currentTarget.value)}
        type="text" 
        placeholder="Buscar CEP...."
        className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize" 
      />
      <UilSearch size={30} className="text-white cursor-pointer transition ease-out hover:scale-125" 
      onClick={handSearchClick}
       />
      <UilMapMarker size={30} className="text-white cursor-pointer transition ease-out hover:scale-125" 
      onClick={handLocationClick}
      />
    </div>

        <div className="flex flex-row w-1/4 items-center justify-center">
            <button 
            name="metric"
            className="text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125"
            onClick={handUnitsChange}
            >°C</button>
            <p className="text-xl text-white mx-1">|</p>
            <button 
            name="imperial"
            className="text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125"
            onClick={handUnitsChange}
            >°F</button>
        </div>


  </div>
  )
}

export default Inputs