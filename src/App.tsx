import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import VideoContent from './View/Contents/VideoContent/VideoContent';
import CamContent from './View/Contents/CamContent/CamContent';
import './styles/App.css';
import { createGlobalStyle } from 'styled-components';

function App() {
    // const history = useHistory();
    // useEffect(() => {
    //   history.push('/'); // 마운트 될 때 /webcam 에 해당하는 페이지로 이동
    // }, [])

    return (
            <Router>
                <Routes>
                    <Route>
                        <Route path="/" element={<CamContent />} />
                        <Route path="/video" element={<VideoContent />} />
                    </Route>
                </Routes>
            </Router>
    );
}

export default App;
