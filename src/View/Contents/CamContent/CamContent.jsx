import React from 'react'
import styled from 'styled-components';
import Sidebar from '../../Sidebar/Sidebar';
import Header from '../../Header/Header';
import WebCamPage from '../../../webCam';

const StyleContent = styled.div`
    background-color:#fff;
    font-family:GangwonEduPowerExtraBoldA;
    display:flex;
    height:100%;
    text-align: center;
    margin-top:-16px;
    
`;
const WebcamContent = styled.section`
    margin: 500px;
    display: block;
    width: 600px;
    height:100%;
    border-color: white;
    margin-top:20px;
`;

export default function CamContent() {
    return (
        <div style={{ height: '100vh' }}>
            <Header />
            <span><hr /></span>
            <StyleContent>
                <Sidebar />
                <WebcamContent>
                    <WebCamPage />
                </WebcamContent>
            </StyleContent>
        </div>
    )
}
