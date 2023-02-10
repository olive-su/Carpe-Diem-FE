import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';

import VideoContent from './views/Contents/VideoContent/VideoContent';
import CamContent from './views/Contents/CamContent/CamContent';
import PageContent from './views/Contents/PageContent/PageContent';

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
        </Router>
    );
}

export default App;
