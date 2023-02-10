import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Page from '../../Page/Page';

const StyleContent = styled.div`
    background-color: #fff;
    font-family: GangwonEduPowerExtraBoldA;
    display: flex;
    margin-top: -16px;
    text-align: center;
`;

const AlbumPage = styled.div`
    height: 100vh;
`;

export default function PageContent() {
    return (
        <div>
            <Header />
            <span>
                <hr />
            </span>

            <StyleContent>
                <Sidebar />
                <AlbumPage></AlbumPage>
            </StyleContent>
            <span>
                <hr style={{ marginTop: '-1px' }} />
            </span>
            <Footer />
        </div>
    );
}
