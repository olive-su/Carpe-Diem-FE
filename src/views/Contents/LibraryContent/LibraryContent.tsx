import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Library from '../../../views/Library/Library';

const StyleContent = styled.div`
    background-color: #f1f5f9;
    font-family: GangwonEduPowerExtraBoldA;
    display: flex;
    margin-top: -16px;
    text-align: center;
`;

const LibraryPage = styled.div`
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
                <Library />
            </StyleContent>
            <span>
                <hr style={{ marginTop: '-1px' }} />
            </span>
            <Footer />
        </div>
    );
}
