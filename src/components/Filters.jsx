import { useContext, useState } from 'react';
import DataContext from '../context/DataContext';

function Filters() {
  const { planets, setPlanetFiltered, planetFiltered } = useContext(DataContext);
  const [options, setOptions] = useState([['population', 'population'],
    ['orbital_period', 'orbitalPeriod'], ['diameter', 'diameter'],
    ['rotation_period', 'rotationPeriod'], ['surface_water', 'surfaceWater']]);
  const [filters, setFilters] = useState({ nome: '',
    number: 0,
    filterCategory: 'population',
    filterNumber: 'maior que' });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setFilters({ ...filters, [name]: value });
    if (name === 'nome') {
      const planetsFiltered = planets.filter((planet) => planet.name.includes(value));
      setPlanetFiltered(planetsFiltered);
    }
  };

  const handleClick = () => {
    console.log(planetFiltered);
    console.log(filters.filterCategory);
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
    const newOptions = options.filter((option) => option[1] !== filters.filterCategory);
    console.log(newOptions);
    setOptions(newOptions);
    setFilters({ ...filters, filterCategory: newOptions[0][1] });
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
        {options.map((option) => (
          <option
            key={ option[0] }
            value={ option[1] }
          >
            {option[0]}

          </option>
        ))}
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
