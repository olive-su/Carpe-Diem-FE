import React from 'react';
import styled from 'styled-components';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MainLayout from '../../../components/MainLayout/MainLayout';
import EmotionLineChart from '../../Emotion/EmotionLineChart';
import EmotionPieChart from '../../Emotion/EmotionPieChart';

const StyledContent = styled.div`
    display: flex;
    justify-content: center;
`;

export default function LibraryContent() {
    return (
        <MainLayout>
            <EmotionLineChart />
            <EmotionPieChart />
            <StyledContent>
                <Alert variant="outlined" severity="info" style={{ width: '70%', marginBottom: '40px' }}>
                    <AlertTitle>
                        <span style={{ color: '#a5dcff' }}>통계 자료는 일주일 단위로 갱신돼요!</span>
                    </AlertTitle>
                </Alert>
            </StyledContent>
        </MainLayout>
    );
}
