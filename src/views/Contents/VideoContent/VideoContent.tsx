import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Video from '../../Video/Video';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const StyleContent = styled.div`
    background-color: #f1f5f9;
    font-family: IBMPlexSansKR-Regular;
    box-sizing: border-box;
    display: flex;
    height: auto;
    margin-top: -16px;
    text-align: center;
`;
const VideoContent = styled.section`
    margin: auto;
    /* overflow: hidden; */
    display: block;
    height: auto;
`;

export default function CamContent() {
    return (
        // <div>
        //     <Header />
        //     <span>
        //         <hr />
        //     </span>
        //     <StyleContent>
        //         <Sidebar />
        //         <VideoContent>
        //             <Video />
        //         </VideoContent>
        //     </StyleContent>
        //     <span>
        //         <hr style={{ marginTop: '-1px' }} />
        //     </span>
        //     <Footer />
        // </div>
        <Video />
    );
}
