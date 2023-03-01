import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';
import Auth from './views/Auth';
import LibraryContent from './views/Contents/LibraryContent/LibraryContent';
import VideoContent from './views/Contents/VideoContent/VideoContent';
import MobileCamContent from './views/Contents/CamContent/MobileCamContent';
import WebCamContent from './views/Contents/CamContent/WebCamContent';
import RemoteCamera from './views/Camera/RemoteCamera';
import Mobile from './views/Camera/RemoteCamera';
import FriendContent from './views/Contents/MyContent/FriendContent';
// import SingleVideo from './views/Album/SingleVideo';
import AlbumMultiContent from './views/Contents/albumContent/AlbumMutiContent';
import Main from './views/Main/main';
import Modal from './views/Camera/Modal';
import PrivateRoute from './views/Auth/PrivateRoute';
import FriendLibraryContent from './views/Contents/FriendLibraryContent/FriendLibraryContent';
import SingleAlbum from './views/FriendAlbum/SingleAlbum';
import VideoDetail from './views/Video/VideoDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/main" element={<Main />} />
                <Route path="/login" element={<Modal />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/video/:cardId" element={<VideoDetail />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/camera/web" element={<WebCamContent />} />
                    <Route path="/camera/mobile" element={<MobileCamContent />} />
                    <Route path="/friend" element={<FriendContent />} />
                    <Route path="/remote" element={<RemoteCamera />} />
                    <Route path="/mobile" element={<Mobile />} />
                    <Route path="/video" element={<VideoContent />} />
                    {/* <Route path="/video/:cardId" element={<SingleVideo />} /> */}
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
