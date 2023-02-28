import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Auth from './views/Auth';
import LibraryContent from './views/Contents/AlbumListContent/AlbumListContent';
import VideoContent from './views/Contents/VideoContent/VideoContent';
import CamContent from './views/Contents/CamContent/CamContent';
import RemoteCamera from './views/Camera/RemoteCamera';
import FriendContent from './views/Contents/MyContent/FriendContent';
import './styles/App.css';
import SingleVideo from './views/Album/SingleVideo';
import SingleAlbumContent from './views/Contents/AlbumContent/SingleAlbumContent';
import Login from './views/Login/Login';
import Parallax from './views/Main/Parallax';

function App() {
    return (
        <Router>
            <Routes>
                <Route>
                    <Route path="/" element={<CamContent />} />
                    <Route path="/friend" element={<FriendContent />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/main" element={<Parallax />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/remote" element={<RemoteCamera />} />
                    <Route path="/video" element={<VideoContent />} />
                    <Route path="/video/:cardId" element={<SingleVideo />} />
                    <Route path="/album" element={<LibraryContent />} />
                    <Route path="/album/:albumId" element={<SingleAlbumContent />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
