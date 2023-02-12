import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';

import VideoContent from './views/Contents/VideoContent/VideoContent';
import CamContent from './views/Contents/CamContent/CamContent';
import AlbumContent from './views/Contents/AlbumContent/AlbumContent';

function App() {
    return (
        <Router>
            <Routes>
                <Route>
                    <Route path="/" element={<CamContent />} />
                    <Route path="/video" element={<VideoContent />} />
                    <Route path="/album" element={<AlbumContent />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
