import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Information, Pricing } from './pages';
import { config } from './config';

const { paths } = config;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home} element={<Pricing />}></Route>
        <Route path={paths.step1} element={<Information />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
