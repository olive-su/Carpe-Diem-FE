import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Views from './View/View';
import MainPage from './View/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
          <Route path="/webcam" element={<Views />} />
        </Route>
      </Routes>
    </Router >
  );
}

export default App;