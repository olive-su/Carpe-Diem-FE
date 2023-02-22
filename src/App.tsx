import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import LibraryContent from './views/Contents/LibraryContent/LibraryContent';
import VideoContent from './views/Contents/VideoContent/VideoContent';
import CamContent from './views/Contents/CamContent/CamContent';
import RemoteCamera from './views/Camera/RemoteCamera';
import './styles/App.css';
import { createGlobalStyle } from 'styled-components';
import AlbumSinglePage from './views/Album/AlbumSinglePage';
import AlbumMultiContent from './views/Contents/AlbumContent/AlbumMutiContent';

function App() {
    return (
        <Router>
            <Routes>
                <Route>
                    <Route path="/" element={<CamContent />} />
                    <Route path="/remote" element={<RemoteCamera />} />
                    <Route path="/video" element={<VideoContent />} />
                    <Route path="/video/:cardId" element={<AlbumSinglePage />} />
                    <Route path="/album" element={<LibraryContent />} />
                    <Route path="/album/:albumId" element={<AlbumMultiContent />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
