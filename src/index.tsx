import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import { client } from './service/datocms'
import { SortProvider, FilterProvider } from './providers/sort';

// [Context 4]
ReactDOM.render(
  <React.StrictMode>
    <FilterProvider>
      <SortProvider>
        <ClientContext.Provider value={client}>
          <App />
        </ClientContext.Provider>
      </SortProvider>
    </FilterProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
