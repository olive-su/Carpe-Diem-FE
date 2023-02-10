import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import VideoContent from './View/Contents/VideoContent/VideoContent';
import CamContent from './View/Contents/CamContent/CamContent';
import PageContent from './View/Contents/PageContent/PageContent';



function App() {

  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<CamContent />} />
          <Route path="/video" element={<VideoContent />} />
          <Route path="/page" element={<PageContent />} />
        </Route>
      </Routes>
    </Router >
  );
}

export default App;