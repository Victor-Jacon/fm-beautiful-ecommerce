import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import { client } from './service/datocms'
import { ProductProvider } from './providers/product';

// [Context 2]
ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <ClientContext.Provider value={client}>
        <App />
      </ClientContext.Provider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
