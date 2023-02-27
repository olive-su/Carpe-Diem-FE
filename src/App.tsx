import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Auth from './views/Auth';
import LibraryContent from './views/Contents/LibraryContent/LibraryContent';
import VideoContent from './views/Contents/VideoContent/VideoContent';
import CamContent from './views/Contents/CamContent/CamContent';
import RemoteCamera from './views/Camera/RemoteCamera';
import Mobile from './views/Camera/MobileCamera';
import FriendContent from './views/Contents/MyContent/FriendContent';
import './styles/App.css';
import AlbumSinglePage from './views/Album/AlbumSinglePage';
import AlbumMultiContent from './views/Contents/albumContent/AlbumMutiContent';
import Main from './views/Main/main';
import Modal from './views/Login/Modal';

function App() {
    return (
        <Router>
            <Routes>
                <Route>
                    <Route path="/main" element={<Main />} />
                    <Route path="/" element={<CamContent />} />
                    {/* <Route path="/friend" element={<FriendContent />} /> */}
                    <Route path="/friend" element={<FriendContent />} />
                    <Route path="/login" element={<Modal />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/remote" element={<RemoteCamera />} />
                    <Route path="/mobile" element={<Mobile />} />
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
