import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';
import Auth from './views/Auth';
import LibraryContent from './views/Contents/LibraryContent/LibraryContent';
import VideoContent from './views/Contents/VideoContent/VideoContent';
import CamContent from './views/Contents/CamContent/CamContent';
import RemoteCamera from './views/Camera/RemoteCamera';
import Mobile from './views/Camera/MobileCamera';
import FriendContent from './views/Contents/MyContent/FriendContent';
import AlbumSinglePage from './views/Album/AlbumSinglePage';
import AlbumMultiContent from './views/Contents/albumContent/AlbumMutiContent';
import Main from './views/Main/main';
import Modal from './views/Camera/Modal';
import PrivateRoute from './views/Auth/PrivateRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Modal />} />
                <Route path="/main" element={<Main />} />
                <Route path="/auth" element={<Auth />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<CamContent />} />
                    <Route path="/friend" element={<FriendContent />} /> <Route path="/remote" element={<RemoteCamera />} />
                    <Route path="/mobile" element={<Mobile />} />
                    <Route path="/video" element={<VideoContent />} />
                    <Route path="/video/:cardId" element={<AlbumSinglePage />} />
                    <Route path="/album" element={<LibraryContent />} />
                    <Route path="/album/:albumId" element={<AlbumMultiContent />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
