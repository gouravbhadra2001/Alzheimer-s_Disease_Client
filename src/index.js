import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Auth0Provider
    domain="dev-s2ox6txtf85ikvhy.us.auth0.com"
    clientId="qC8MT8QFeUqlppmV6upNZToYl0MeRves"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
     <App />
  </Auth0Provider>
 

  </BrowserRouter>
    
  </React.StrictMode>

);
