import React from 'react';
import Edit from '../../MyPage/Edit';
import Sidebar from '../../../components/Sidebar/Sidebar';
import styled from 'styled-components';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const Center = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: row;
`;

export default function EditContent() {
    return (
        <div>
            <Header />
            <span>
                <hr />
            </span>
            <Center>
                <Sidebar />
                <Edit />
            </Center>
            <Footer />
        </div>
    );
}
