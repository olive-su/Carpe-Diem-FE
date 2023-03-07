import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { Typography } from '@mui/material';

const StyledContent = styled.div`
    display: flex;
    justify-content: center;
`;

export default function LibraryContent() {
    const [realData, setRealData] = useState<any>({});
    const [data, setData] = useState<any>([]);
    const emotionDay: any = [];

    const resultData: any = {
        happy: [],
        sad: [],
        surprised: [],
        disgusted: [],
        angry: [],
        fearful: [],
    };

    React.useEffect(function () {
        axios({
            url: `/report`,
            method: 'get',
            withCredentials: true,
        })
            .then(function (result: any) {
                console.log('!!!!!', result.data);
                setRealData(result.data);
            })
            .catch(function (error: any) {
                console.error('user 에러발생: ', error);
            });
    }, []);

    useEffect(() => {
        if (Object.keys(realData).length === 0) {
            return;
        }

        Object.keys(resultData).forEach((emtion) => {
            Object.keys(realData).forEach((date, index) => {
                resultData[emtion][index] = realData[date][emtion];
                const day = new Date(date).getDay();
                if (day === 0) emotionDay[index] = '일요일';
                else if (day === 1) emotionDay[index] = '월요일';
                else if (day === 2) emotionDay[index] = '화요일';
                else if (day === 3) emotionDay[index] = '수요일';
                else if (day === 4) emotionDay[index] = '목요일';
                else if (day === 5) emotionDay[index] = '금요일';
                else if (day === 6) emotionDay[index] = '토요일';
            });
        });

        const newData = emotionDay.map((day: any, index: any) => ({
            name: day,
            행복해요: resultData['happy'][index],
            슬퍼요: resultData['sad'][index],
            놀라워요: resultData['surprised'][index],
            힘들어요: resultData['disgusted'][index],
            화나요: resultData['angry'][index],
            무서워요: resultData['fearful'][index],
        }));
        setData(newData);
    }, [realData]);

    const sumEmotion: any = {
        happy: data.reduce((a: any, b: any) => a + b.행복해요, 0),
        sad: data.reduce((a: any, b: any) => a + b.슬퍼요, 0),
        surprised: data.reduce((a: any, b: any) => a + b.놀라워요, 0),
        disgusted: data.reduce((a: any, b: any) => a + b.힘들어요, 0),
        angry: data.reduce((a: any, b: any) => a + b.화나요, 0),
        fearful: data.reduce((a: any, b: any) => a + b.무서워요, 0),
    };
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
                감정리포트
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
                <EmotionLineChart data={data} />
                <EmotionPieChart data={data} sumEmotion={sumEmotion} />
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
