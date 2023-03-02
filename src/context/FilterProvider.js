import React, { useMemo, useState } from 'react';
import propTypes from 'prop-types';
import FilterContext from './FilterContext';

function FilterProvider({ children }) {
  const [options, setOptions] = useState([['population', 'population'],
    ['orbital_period', 'orbitalPeriod'], ['diameter', 'diameter'],
    ['rotation_period', 'rotationPeriod'], ['surface_water', 'surfaceWater']]);

  const [selectFilters, setSelectFilters] = useState([]);

  const [order, setOrder] = useState({ });

  const [positions, setposition] = useState([]);

  const values = useMemo(() => ({
    options,
    setOptions,
    positions,
    setposition,
    order,
    setOrder,
    selectFilters,
    setSelectFilters,
  }), [options, selectFilters, setSelectFilters,
    order, setOrder, positions, setposition]);
  return (
    <FilterContext.Provider value={ values }>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: propTypes.shape.isRequired,
};

export default FilterProvider;
