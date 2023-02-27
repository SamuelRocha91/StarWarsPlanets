import { useContext, useState } from 'react';
import DataContext from '../context/DataContext';

function Filters() {
  const [name, setName] = useState('');
  const { planets, setPlanetFiltered } = useContext(DataContext);

  const handleChange = ({ target }) => {
    const { value } = target;
    setName(value);
    const planetsFiltered = planets.filter((planet) => planet.name.includes(value));
    setPlanetFiltered(planetsFiltered);
  };
  return (
    <input
      type="text"
      placeholder="Digite o nome"
      value={ name }
      data-testid="name-filter"
      onChange={ handleChange }
    />
  );
}

export default Filters;
