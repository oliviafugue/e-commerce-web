import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.jsx';
import Navigation from './routes/navigation/navigation.jsx'
import Authentication from './routes/authentication/authentication.component.jsx';

const App = () => {

  
  const Shop = () => {
    return (
      <h1>I am the shop page.</h1>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
