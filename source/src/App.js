import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { Outlet } from 'react-router-dom';

import { OrganizationContextProvider } from './components/utilities/context/organization';

import BrandHeader from "./components/layout/header/BrandHeader";
import AppHeader from "./components/layout/header/AppHeader";

const App = () => {
  return (
    <Auth0Provider
      domain="dev-ko-0isuz.us.auth0.com"
      clientId="Bg3sS9OKmQLUs1DTHqeeXw7dlx69BGrz"
      audience="https://api.skewly.io/"
      redirectUri={window.location.origin}
    >
      <BrandHeader />
      <OrganizationContextProvider>
        <AppHeader />
        <div className="container mx-auto">
          <Outlet />
        </div>
      </OrganizationContextProvider>
    </Auth0Provider>
  );
}

export default App;
