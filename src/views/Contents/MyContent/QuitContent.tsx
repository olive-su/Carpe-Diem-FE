import React from 'react';
import Edit from '../../MyPage/Edit';
import Sidebar from '../../MyPage/Sidebar';
import styled from 'styled-components';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const Center = styled.div`
    height: 9;
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