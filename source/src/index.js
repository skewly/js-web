import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ko-0isuz.us.auth0.com"
      clientId="Bg3sS9OKmQLUs1DTHqeeXw7dlx69BGrz"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();