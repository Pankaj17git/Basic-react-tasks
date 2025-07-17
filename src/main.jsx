import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Path from './routes/index.jsx'
import { Auth0Provider } from '@auth0/auth0-react'

const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;

console.log(domain);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
     domain={domain}
     clientId={clientId}
     authorizationParams={{
      redirect_uri: window.location.origin,
     }}
    >
     <Path/>
    </Auth0Provider>
  </StrictMode>,
)
