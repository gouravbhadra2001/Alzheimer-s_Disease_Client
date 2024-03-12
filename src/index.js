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
    domain="dev-ara8hgl5apcohzec.us.auth0.com"
    clientId="w1r2joaOHghaYXesu09J9wEFhULxMQnS"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
     <App />
  </Auth0Provider>
 

  </BrowserRouter>
    
  </React.StrictMode>

);
