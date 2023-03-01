import propTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import DataContext from './DataContext';

function DataProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetFiltered, setPlanetFiltered] = useState([]);

  const fetchAPI = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    const planetsApi = data.results.map(({
      name,
      rotation_period: rotationPeriod,
      orbital_period: orbitalPeriod,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water: surfaceWater,
      population,
      films,
      created,
      edited,
      url,
    }) => ({
      name,
      rotationPeriod,
      orbitalPeriod,
      diameter,
      climate,
      gravity,
      terrain,
      surfaceWater,
      population,
      films,
      created,
      edited,
      url,
    }));
    setPlanets(planetsApi);
    setPlanetFiltered(planetsApi);
  };

  const values = useMemo(() => ({
    planets, setPlanets, planetFiltered, setPlanetFiltered, fetchAPI,
  }), [planets, setPlanets, planetFiltered, setPlanetFiltered]);
  return (
    <DataContext.Provider value={ values }>
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: propTypes.shape.isRequired,
};

export default DataProvider;
