import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Table from './components/Table';
import DataContext from './context/DataContext';

function App() {
  const [planets, setPlanets] = useState([]);
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
    });
  }, []);
  const values = useMemo(() => ({
    planets,
  }), [planets]);
  return (
    <DataContext.Provider value={ values }>
      <Table />
    </DataContext.Provider>
  );
}

export default App;
