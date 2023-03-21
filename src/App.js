import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.jsx';
import Navigation from './routes/navigation/navigation.jsx'
import Shop from './routes/shop/shop.component.jsx'
import Authentication from './routes/authentication/authentication.component.jsx';
import CheckOut from './routes/checkout/checkout.component.jsx';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
}

export default App;
