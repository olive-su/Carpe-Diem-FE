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
import { Typography } from '@mui/material';

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
            <Typography
                sx={{
                    width: '70%',
                    marginLeft: '15%',
                    fontSize: '40px',
                    fontWeight: 'bold',
                    p: '4px 0px',
                    mt: '20px',
                    mb: '20px',
                    color: 'var(--white)',
                }}
            >
                감정그래프
            </Typography>
            {/* <Alert variant="outlined" severity="info" style={{ width: '60%', marginBottom: '40px', marginLeft: '15%' }}> */}
            <div style={{ display: 'flex' }}>
                <Alert variant="outlined" severity="info" style={{ width: '60%', marginLeft: '18%' }}>
                    <AlertTitle>
                        <span style={{ color: '#a5dcff' }}>통계 자료는 일주일 단위로 갱신돼요!</span>
                    </AlertTitle>
                </Alert>
                <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center' }}>
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
                </span>
            </div>
            <div id="chart" style={{ padding: '1rem', backgroundColor: '#333' }}>
                <EmotionLineChart />
                <EmotionPieChart />
            </div>
            <StyledContent>
                {/* <Alert variant="outlined" severity="info" style={{ width: '70%', marginBottom: '40px' }}>
                    <AlertTitle>
                        <span style={{ color: '#a5dcff' }}>통계 자료는 일주일 단위로 갱신돼요!</span>
                    </AlertTitle>
                </Alert> */}
            </StyledContent>
        </MainLayout>
    );
}
