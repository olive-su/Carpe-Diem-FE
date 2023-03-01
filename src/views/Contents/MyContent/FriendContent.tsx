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
    background: #333;
    justify-content: center;
`;

export default function FriendContent() {
    return (
        <div>
            <Center>
                <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={4}>
                        <Edit />
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
