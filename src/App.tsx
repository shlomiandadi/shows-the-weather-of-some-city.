import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Favorites from './components/favorites/favorites';
import Header from './components/header/header';
import Home from './components/home/home';
import { isCelsiusContext } from "./contexts/unitContext";

const App=() => {
  const [isCelsius, setIsCelsius] = React.useState(true);
  return (
    // @ts-ignore
    <isCelsiusContext.Provider value={isCelsius}>
      <BrowserRouter>
        <Header isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/town/:city" element={<Home />} />
          <Route path="Favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
      </isCelsiusContext.Provider>
  );
}
export default App;
