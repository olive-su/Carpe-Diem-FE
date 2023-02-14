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
    height: auto;
    text-align: left;
    margin-top: -16px;
`;
const WebcamPage = styled.section`
    display: block;
    text-align: center;
    margin-left: 10px;
    margin-top: 20px;
`;

export default function CamContent() {
    return (
        <>
            <Header />
            <span>
                <hr />
            </span>
            <StyleContent>
                <Sidebar />
                <WebcamPage>
                    <WebCamPage />
                </WebcamPage>
            </StyleContent>
            <span>
                <hr style={{ marginTop: '-1px' }} />
            </span>
            <Footer />
        </>
    );
}
