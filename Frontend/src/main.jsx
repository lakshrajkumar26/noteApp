import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';

const domain = import.meta.env.VITE_DOMAIN
const clientId = import.meta.env.VITE_CLIENT_ID

// import('dotenv').config();
createRoot(document.getElementById('root')).render(
 <Auth0Provider  
  domain = {domain}
  clientId= {clientId}
  authorizationParams={{
    redirect_uri: window.location.origin
  }}>
      <App />
  </Auth0Provider>
)
