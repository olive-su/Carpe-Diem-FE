import React from 'react';
import Friend from '../../MyPage/Friend/Friend';
import Sidebar from '../../../components/Sidebar/Sidebar';
import styled from 'styled-components';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Edit from '../../MyPage/Edit';

const Center = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: row;
`;

export default function FriendContent() {
    return (
        <div>
            <Header />
            <span>
                <hr />
            </span>
            <Center>
                <Sidebar />
                <Edit />
                <Friend />
            </Center>
            <Footer />
        </div>
    );
}
