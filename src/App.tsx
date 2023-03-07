import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';
import LibraryContent from './views/Contents/LibraryContent/LibraryContent';
import VideoContent from './views/Video/Video';
import MobileCamContent from './views/Contents/CamContent/MobileCamContent';
import WebCamContent from './views/Contents/CamContent/WebCamContent';
import RemoteCamera from './views/Camera/RemoteCamera';
import Mobile from './views/Camera/RemoteCamera';
import FriendContent from './views/Contents/MyContent/FriendContent';
import AlbumMultiContent from './views/Contents/AlbumContent/AlbumMutiContent';
import Main from './views/Main/main';
import PrivateRoute from './views/Auth/PrivateRoute';
import FriendLibraryContent from './views/Contents/FriendLibraryContent/FriendLibraryContent';
import SingleAlbum from './views/FriendAlbum/SingleAlbum';
import VideoDetail from './views/Video/VideoDetail';
import EmotionContent from './views/Contents/EmotionContent/EmotionContent';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/main" element={<Main />} />
                <Route path="/video/:cardId" element={<VideoDetail />} />
                <Route path="/report" element={<EmotionContent />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/camera/web" element={<WebCamContent />} />
                    <Route path="/camera/mobile" element={<MobileCamContent />} />
                    <Route path="/friend" element={<FriendContent />} />
                    <Route path="/remote/:userId" element={<RemoteCamera />} />
                    <Route path="/mobile" element={<Mobile />} />
                    <Route path="/video" element={<VideoContent />} />
                    <Route path="/album" element={<LibraryContent />} />
                    <Route path="/album/:albumId" element={<AlbumMultiContent />} />
                    <Route path="friendAlbum/:userId" element={<FriendLibraryContent />} />
                    <Route path="/friendAlbum/:userId/:albumId" element={<SingleAlbum />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
