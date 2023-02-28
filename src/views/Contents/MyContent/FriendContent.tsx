import React from 'react';
import Friend from '../../MyPage/Friend/Friend';
import Sidebar from '../../../components/Sidebar/Sidebar';
import styled from 'styled-components';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Edit from '../../MyPage/Edit';
import Send from '../../MyPage/Send';
import Receive from '../../MyPage/Receive';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

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
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Edit />
                    </Grid>
                    <Grid item xs={4}>
                        <Friend />
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Send />
                        <Receive />
                    </Grid>
                </Grid>
            </Center>
            <Footer />
        </div>
    );
}
