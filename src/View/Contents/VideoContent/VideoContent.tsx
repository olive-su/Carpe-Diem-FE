import React from 'react'
import styled from 'styled-components';
import Sidebar from '../../Sidebar/Sidebar';
import Video from '../../Video/Video'
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

const StyleContent = styled.div`
    background-color: #f1f5f9;
    font-family: GangwonEduPowerExtraBoldA;
    display: flex;
    margin-top:-16px;
    text-align: center;
    
`;
const VideoContent = styled.section`
    margin: auto;
`;

export default function CamContent() {
    return (
        <div style={{ height: '100vh' }}>
            <Header />
            <span><hr /></span>
            <StyleContent>
                <Sidebar />
                <VideoContent>
                    <Video />
                </VideoContent>
            </StyleContent>
            <span ><hr style={{ marginTop: '-1px' }} /></span>
            <Footer />
        </div>
    )
}
