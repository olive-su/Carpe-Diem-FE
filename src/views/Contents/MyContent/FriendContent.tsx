import React from 'react';
import Friend from '../../MyPage/Friend/Friend';

import styled from 'styled-components';
import Header from '../../../components/Header/Header';

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
                <Edit />
                <Friend />
            </Center>
        </div>
    );
}
