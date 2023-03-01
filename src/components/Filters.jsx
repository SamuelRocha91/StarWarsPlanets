import { useContext, useEffect, useState } from 'react';
import DataContext from '../context/DataContext';

function Filters() {
  const { planets, setPlanetFiltered } = useContext(DataContext);
  const [positions, setposition] = useState([]);
  const [filters, setFilters] = useState({ nome: '',
    number: 0,
    filterCategory: 'population',
    filterNumber: 'maior que' });
  const [selectFilters, setSelectFilters] = useState([]);
  const [options, setOptions] = useState([['population', 'population'],
    ['orbital_period', 'orbitalPeriod'], ['diameter', 'diameter'],
    ['rotation_period', 'rotationPeriod'], ['surface_water', 'surfaceWater']]);

  const newFilter = () => {
    const planetsFiltered = planets.filter((planet) => selectFilters
      .every(({ column, comparison, value }) => {
        console.log(column, comparison, value);
        if (comparison === 'maior que') {
          const trueOrFalse = Number(planet[column]) > value;
          console.log(trueOrFalse);
          return trueOrFalse;
        }
        if (comparison === 'menor que') {
          const trueOrFalse = Number(planet[column]) < value;
          return trueOrFalse;
        }
        const trueOrFalse = Number(planet[column])
    === Number(value);
        return trueOrFalse;
      }));
    console.log(planetsFiltered);
    console.log(selectFilters);
    setPlanetFiltered(planetsFiltered.filter((planet) => planet
      .name.includes(filters.nome)));
  };
  const opt = () => {
    const newOptions = options.filter((option) => {
      if (positions.length === 0) {
        return true;
      }
      return !(positions.some((position) => position === option[1]));
    });
    setOptions(newOptions);
  };
  useEffect(() => {
    newFilter();
    opt();
  }, [filters.nome, positions, selectFilters, setSelectFilters]);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setFilters({ ...filters, [name]: value });
  };

  const handleClick = () => {
    setSelectFilters([...selectFilters, {
      column: filters.filterCategory,
      comparison: filters.filterNumber,
      value: filters.number,
    }]);
    setposition([...positions, filters.filterCategory]);
    setFilters({ ...filters, filterCategory: options[0][1] });
  };

  const removeFilter = (index) => {
    if (index === 'all') {
      return setSelectFilters([]);
    }
    const newSelectFilter = selectFilters.filter((select, i) => i !== index);
    setSelectFilters(newSelectFilter);
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
      {selectFilters && selectFilters.map(({ column, comparison, value }, index) => (
        <div data-testid="filter" key={ `${column} ${comparison} ${value}` }>
          <p>{`${column} ${comparison} ${value}`}</p>
          <button
            onClick={ () => removeFilter(index) }
          >
            X
          </button>
        </div>

      ))}
      <button
        data-testid="button-remove-filters"
        onClick={ () => removeFilter('all') }
      >
        Remover filtros
      </button>
    </>
  );
}

export default Filters;
