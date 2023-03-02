import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DataProvider from './context/DataProvider';
import FilterProvider from './context/FilterProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <DataProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </DataProvider>,
  );
