import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Favorites from './components/favorites/favorites';
import Header from './components/header/header';
import Home from './components/home/home';

const App=() => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/town/:city" element={<Home />} />
        <Route path="Favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
