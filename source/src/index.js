import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';
import reportWebVitals from './reportWebVitals';

import Company from './routes/company';
import Developers from './routes/developers';
import Pricing from './routes/pricing';
import Products from './routes/products';

import './index.css';
import './tailwind.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="products" element={<Products />} />
        <Route path="developers" element={<Developers />} />
        <Route path="company" element={<Company />} />
        <Route path="pricing" element={<Pricing />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();