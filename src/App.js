import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import DataContext from './context/DataContext';

function App() {
  const [planets, setPlanets] = useState([]);
  const [planetFiltered, setPlanetFiltered] = useState([]);
  useEffect(() => {
    fetch('https://swapi.dev/api/planets').then((response) => response.json()).then((data) => {
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
    });
  }, []);
  const values = useMemo(() => ({
    planets, setPlanets, planetFiltered, setPlanetFiltered,
  }), [planets, setPlanets, planetFiltered, setPlanetFiltered]);
  console.log(planetFiltered);
  return (
    <DataContext.Provider value={ values }>
      <Filters />
      <Table />
    </DataContext.Provider>
  );
}

export default App;
