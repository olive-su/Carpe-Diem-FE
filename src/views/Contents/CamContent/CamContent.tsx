import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import WebCamPage from '../../webCam';

const StyleContent = styled.div`
    background-color: #fff;
    font-family: GangwonEduPowerExtraBoldA;
    display: flex;
    height: 100vh;
    text-align: center;
    margin-top: -16px;
`;
const WebcamContent = styled.section`
    display: block;
    text-align: center;
    margin-top: 20px;
    width: 1000px;
    border-color: white;
    margin: 20px auto;
`;

const WebcamPage = styled.section`
    position: relative;
    width: 1024px;
    left: 50%;
    margin-left: 512px;
`;

export default function CamContent() {
    return (
        <div style={{ height: '100vh' }}>
            <Header />
            <span>
                <hr />
            </span>
            <StyleContent>
                <Sidebar />
                <WebcamContent>
                    <WebcamPage>
                        <WebCamPage />
                    </WebcamPage>
                </WebcamContent>
            </StyleContent>
            <span>
                <hr style={{ marginTop: '-1px' }} />
            </span>
            <Footer />
        </div>
    );
}
