import React from 'react';
import Edit from '../../MyPage/Edit';

import styled from 'styled-components';
import Header from '../../../components/Header/Header';

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
                <Edit />
            </Center>
        </div>
    );
}
