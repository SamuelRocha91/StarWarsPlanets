import { useContext, useState } from 'react';
import DataContext from '../context/DataContext';

function Filters() {
  const [filters, setFilters] = useState({ nome: '',
    number: 0,
    filterCategory: 'population',
    filterNumber: 'maior que' });
  const { planets, setPlanetFiltered, planetFiltered } = useContext(DataContext);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setFilters({ ...filters, [name]: value });
    if (name === 'nome') {
      const planetsFiltered = planets.filter((planet) => planet.name.includes(value));
      setPlanetFiltered(planetsFiltered);
    }
  };

  const handleClick = () => {
    const newFilter = planetFiltered.filter((planet) => {
      if (filters.filterNumber === 'maior que') {
        const trueOrFalse = Number(planet[filters.filterCategory]) > filters.number;
        return trueOrFalse;
      }
      if (filters.filterNumber === 'menor que') {
        const trueOrFalse = Number(planet[filters.filterCategory]) < filters.number;
        return trueOrFalse;
      }
      const trueOrFalse = Number(planet[filters.filterCategory])
      === Number(filters.number);
      return trueOrFalse;
    });
    setPlanetFiltered(newFilter);
  };
  return (
    <>
      <input
        name="nome"
        type="text"
        placeholder="Digite o nome"
        value={ filters.nome }
        data-testid="name-filter"
        onChange={ handleChange }
      />
      <select
        name="filterCategory"
        id="filterCategory"
        data-testid="column-filter"
        value={ filters.filterCategory }
        onChange={ handleChange }
      >
        <option
          value="population"
        >
          population

        </option>
        <option
          value="orbitalPeriod"
        >
          orbital_period

        </option>
        <option
          value="diameter"
        >
          diameter

        </option>
        <option
          value="rotationPeriod"
        >
          rotation_period

        </option>
        <option
          value="surfaceWater"
        >
          surface_water

        </option>
      </select>
      <select
        name="filterNumber"
        id="filterNumber"
        data-testid="comparison-filter"
        value={ filters.filterNumber }
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        onChange={ handleChange }
        type="number"
        name="number"
        data-testid="value-filter"
        value={ filters.number }
      />
      <button onClick={ handleClick } data-testid="button-filter">Filtrar</button>
    </>
  );
}

export default Filters;
