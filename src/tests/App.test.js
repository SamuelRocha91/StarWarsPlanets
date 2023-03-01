import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { data } from './Helpers/mockData';
import userEvent from '@testing-library/user-event';
import DataProvider from '../context/DataProvider';

 

describe('Verifica se a aplicação...', () => {
  const category = ['Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'Url']

  beforeEach(() => {
      global.fetch = jest.fn(async () => ({
          json: async () => data
        }));
  })
  afterEach(function() {
      global.fetch.mockReset();
      });

  test('renderiza filtros para as informações a serem carregadas', () => {
    render( <DataProvider>
      <App />
    </DataProvider>,
  )
    const inputText = screen.getByTestId("name-filter");
    const columnFilter = screen.getByTestId("column-filter")
    const comparisonFilter = screen.getByTestId("comparison-filter")
    const valueFilter = screen.getByTestId("value-filter");

    expect(inputText).toBeInTheDocument()
    expect(columnFilter).toBeInTheDocument()
    expect(comparisonFilter).toBeInTheDocument()
    expect(valueFilter).toBeInTheDocument()
  })
  test('renderiza uma tabela com um dado conteúdo de título de categoria', () => {
    render( <DataProvider>
      <App />
    </DataProvider>,
  );
    const classe = screen.getAllByRole('columnheader')
    category.map((item,index) => {
      expect(classe[index]).toHaveTextContent(item);
        })
    expect(classe).toHaveLength(13)

  })

  test('faz a requisição a API e renderiza as informações necessárias', async () => {
    render( <DataProvider>
      <App />
    </DataProvider>,
  );
    const planet = await screen.findByText("Tatooine")
    expect(planet).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalled()
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith("https://swapi.dev/api/planets")
  })

  test('consegue fazer a filtragem do input de texto corretamente', async () => {
    render( <DataProvider>
      <App />
    </DataProvider>,
  );
    const inputText = screen.getByTestId("name-filter");
    const planet = await screen.findByText("Tatooine");

    userEvent.type(inputText, 'a')

    expect(screen.getByText('Tatooine')).toBeInTheDocument()
    expect(screen.getByText('Alderaan')).toBeInTheDocument()
    expect(screen.getByText('Yavin IV')).toBeInTheDocument()
    expect(screen.getByText('Dagobah')).toBeInTheDocument()
    expect(screen.getByText('Naboo')).toBeInTheDocument()
    expect(screen.getByText('Coruscant')).toBeInTheDocument()
    expect(screen.getByText('Kamino')).toBeInTheDocument()

    userEvent.type(inputText, 'a')

    expect(screen.queryByText('Dagobah')).not.toBeInTheDocument()
    expect(screen.getByText('Alderaan')).toBeInTheDocument();

  })

  test('consegue realizar filtros de comparação por categoria e números', async () => {
    render( <DataProvider>
      <App />
    </DataProvider>,
  );

    const planet = await screen.findByText("Tatooine");

    const columnFilter = screen.getByTestId("column-filter")
    const comparisonFilter = screen.getByTestId("comparison-filter")
    const valueFilter = screen.getByTestId("value-filter");
    const button = screen.getByTestId("button-filter")

    userEvent.type(valueFilter, "2000000000")

    userEvent.click(button)

    expect(screen.getByText('Naboo')).toBeInTheDocument()
    expect(screen.getByText('Coruscant')).toBeInTheDocument()
    expect(screen.queryByText('Tatooine')).not.toBeInTheDocument()


    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, "368")
    userEvent.selectOptions(screen.getByTestId('column-filter'), "orbitalPeriod")
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), "menor que")
    userEvent.click(button)

    expect(screen.getByText('Naboo')).toBeInTheDocument()
    expect(screen.queryByText('Coruscant')).not.toBeInTheDocument()

    userEvent.selectOptions(screen.getByTestId('comparison-filter'), "igual a")
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, "311")
    userEvent.click(button)
    expect(screen.queryByText('Naboo')).not.toBeInTheDocument()
  })

  test('consegue apagar os filtros selecionados', async() => {
    render(<DataProvider>
      <App />
    </DataProvider>)
    const planet = await screen.findByText("Alderaan");
    const btnRemoveAll = screen.getByTestId('button-remove-filters');

    expect(btnRemoveAll).toBeInTheDocument()

    const columnFilter = screen.getByTestId("column-filter")
    const comparisonFilter = screen.getByTestId("comparison-filter")
    const valueFilter = screen.getByTestId("value-filter");
    const button = screen.getByTestId("button-filter")

   
    userEvent.type(valueFilter, "2000000000")

    userEvent.click(button)

    expect(screen.getByText('Naboo')).toBeInTheDocument()
    expect(screen.getByText('Coruscant')).toBeInTheDocument()
    expect(screen.queryByText('Tatooine')).not.toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'X'})).toBeInTheDocument()


    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, "368")
    userEvent.selectOptions(screen.getByTestId('column-filter'), "orbitalPeriod")
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), "menor que")
    userEvent.click(button)

    expect(screen.getByText('Naboo')).toBeInTheDocument()
    expect(screen.queryByText('Coruscant')).not.toBeInTheDocument()

    userEvent.click(screen.getAllByRole('button', {name: 'X'})[1])

    expect(screen.getByText('Coruscant')).toBeInTheDocument()

    userEvent.click(btnRemoveAll)

    expect(screen.getByText('Tatooine')).toBeInTheDocument()
  })
})
