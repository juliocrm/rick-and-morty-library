import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { StrictMode } from 'react';
import './styles/index.css'
import App from './App.jsx'
import client from './apollo/client.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
