import React from 'react';
import Friend from '../../MyPage/Friend/Friend';
import styled from 'styled-components';
import Edit from '../../MyPage/Edit';
import Send from '../../MyPage/Send';
import Receive from '../../MyPage/Receive';
import Grid from '@mui/material/Grid';

const Center = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: row;
`;

export default function FriendContent() {
    return (
        <div>
            <Center>
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
        </div>
    );
}
