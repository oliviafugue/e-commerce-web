import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { CartProvider } from './contexts/cart.context.jsx'
import { CategoriesProvider } from './contexts/categories.context';
import { UserProvider } from './contexts/user.context'

import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> 
    <React.StrictMode>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
         </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </React.StrictMode>
  </BrowserRouter>
);