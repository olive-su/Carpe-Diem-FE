import React from 'react'
import styled from 'styled-components';
import Sidebar from '../../Sidebar/Sidebar';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
// import WebCamPage from '../../../webCam'

const StyleContent = styled.div`
    background-color:#fff;
    font-family:GangwonEduPowerExtraBoldA;
    display:flex;
    height:100vh;
    text-align: center;
    margin-top:-16px;
    
`;
const WebcamContent = styled.section`
    display: block;
    text-align: center;
    margin-top:20px;
    width: 1000px;
    border-color:white;
    margin: 20px auto;
`;



export default function CamContent() {
    return (
        <div style={{ height: '100vh' }}>
            <Header />
            <span><hr /></span>
            <StyleContent>
                <Sidebar />
                <WebcamContent>
                    {/* <WebCamPage style={{ position: 'relative', width: '1024px', left: '50%', marginLeft: '512px' }} /> */}
                </WebcamContent>
            </StyleContent>
            <span ><hr style={{ marginTop: '-1px' }} /></span>
            <Footer />
        </div>
    )
}
