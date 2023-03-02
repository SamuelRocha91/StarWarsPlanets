import { useContext, useEffect, useState } from 'react';
import DataContext from '../context/DataContext';
import FilterContext from '../context/FilterContext';

function Filters() {
  const { planets, setPlanetFiltered } = useContext(DataContext);
  const { options,
    setOptions,
    positions,
    setposition,
    order,
    setOrder,
    selectFilters,
    setSelectFilters } = useContext(FilterContext);

  const categorys = [['population', 'population'],
    ['orbital_period', 'orbitalPeriod'], ['diameter', 'diameter'],
    ['rotation_period', 'rotationPeriod'], ['surface_water', 'surfaceWater']];

  const [filters, setFilters] = useState({ nome: '',
    number: 0,
    columnSort: 'population',
    filterCategory: 'population',
    filterNumber: 'maior que',
    column: 'population',
    sort: 'ASC' });

  const orderFilter = (planetsFiltered) => {
    const { column } = order;
    const negativeNumber = -1;
    if (order && order.sort === 'ASC') {
      return planetsFiltered
        .sort((a, b) => {
          if (a[column] === 'unknown') {
            return 1;
          } if (b[column] === 'unknown') {
            return negativeNumber;
          }
          return Number(a[column]) - Number(b[column]);
        });
    } if (order && order.sort === 'DESC') {
      return planetsFiltered
        .sort((a, b) => Number(b[column]) - Number(a[column]));
    }
  };

  const newFilter = () => {
    const planetsFiltered = planets.filter((planet) => selectFilters
      .every(({ column, comparison, value }) => {
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
      })).filter((planet) => planet
      .name.includes(filters.nome));

    const orderedPlanets = orderFilter(planetsFiltered);
    setPlanetFiltered(orderedPlanets || planetsFiltered);
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
  }, [filters.nome, positions, selectFilters, order]);

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

  const saveOrderFilter = () => {
    setOrder({ column: filters.column, sort: filters.sort });
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
      <select
        name="column"
        id="columnSort"
        data-testid="column-sort"
        value={ filters.column }
        onChange={ handleChange }
      >
        {categorys.map((option) => (
          <option
            key={ option[0] }
            value={ option[1] }
          >
            {option[0]}

          </option>
        ))}
      </select>

      <label htmlFor="asc">
        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="asc"
          onChange={ handleChange }
        />
        {' '}
        Ascendente
      </label>
      <label htmlFor="desc">
        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-desc"
          value="DESC"
          id="asc"
          onChange={ handleChange }
        />
        {' '}
        Descendente
      </label>
      <button
        onClick={ saveOrderFilter }
        data-testid="column-sort-button"
      >
        Ordenar

      </button>
    </>
  );
}

export default Filters;
