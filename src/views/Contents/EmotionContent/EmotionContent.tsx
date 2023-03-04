import React from 'react';
import styled from 'styled-components';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MainLayout from '../../../components/MainLayout/MainLayout';
import EmotionLineChart from '../../Emotion/EmotionLineChart';
import EmotionPieChart from '../../Emotion/EmotionPieChart';
import html2canvas from 'html2canvas';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-regular-svg-icons';
import Share from '../../Emotion/Share';

const StyledContent = styled.div`
    display: flex;
    justify-content: center;
`;

export default function LibraryContent() {
    const onCapture = () => {
        console.log('onCapture');
        html2canvas(document.getElementById('chart') as HTMLElement)?.then((canvas) => {
            onSaveAs(canvas.toDataURL('image/png'), 'Carpediem-emotionReport.png');
        });
    };

    const onSaveAs = (uri: any, filename: any) => {
        console.log('onSaveAs');
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = uri;
        link.download = filename;
        link.click();
        document.body.removeChild(link);
    };

    return (
        <MainLayout>
            <div style={{ display: 'flex', flexDirection: 'row', width: '70%', marginLeft: '15%', justifyContent: 'right' }}>
                <IconButton onClick={onCapture}>
                    <FontAwesomeIcon
                        icon={faCircleDown}
                        style={{
                            color: '#fff',
                        }}
                    />
                    {/* <DownloadIcon /> */}
                </IconButton>
                <Share />
            </div>
            <div id="chart" style={{ padding: '1rem', backgroundColor: '#333' }}>
                <EmotionLineChart />
                <EmotionPieChart />
            </div>
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
