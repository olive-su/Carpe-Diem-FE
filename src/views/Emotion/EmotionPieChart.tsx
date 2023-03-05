import React, { useCallback } from 'react';
import { ResponsiveContainer, PieChart, Pie, LabelList } from 'recharts';
import styled from 'styled-components';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';

const CardBox = styled.div`
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    text-align: center;
    border-radius: 1rem;
    margin-bottom: 2em;
`;

const EmotionPieChart = (props: any) => {
    const data = [
        {
            name: '😃 행복해요',
            value: props.sumEmotion['happy'],
            fill: '#fdba74',
        },
        {
            name: '😢 슬퍼요',
            value: props.sumEmotion['sad'],
            fill: '#67e8f9',
        },
        {
            name: '😳 놀라워요',
            value: props.sumEmotion['surprised'],
            fill: '#fde047',
        },
        {
            name: '🤮 힘들어요',
            value: props.sumEmotion['disgusted'],
            fill: '#86efac',
        },
        {
            name: '🤬 화나요',
            value: props.sumEmotion['angry'],
            fill: '#fda4af',
        },
        {
            name: '😱 무서워요',
            value: props.sumEmotion['fearful'],
            fill: '#d8b4fe',
        },
    ];

    const total: any = Object.values(props.sumEmotion).reduce((a: any, b: any) => a + b, 0);

    const renderCustomizedLabelPercentage = (value: any) => {
        const percentageCalculated = ((value.value / total) * 100).toFixed(2);
        return `${percentageCalculated}%`;
    };

    const renderLabel = useCallback((piePiece: any) => {
        return piePiece.name;
    }, []);

    return (
        <CardBox style={{ width: '70%', height: '500px', background: '#333', marginLeft: '15%' }}>
            <CardBox>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie dataKey="value" data={data} label={renderLabel} cx="30%" cy="50%" outerRadius={'60%'} nameKey="name">
                            <LabelList dy={0} fill="#4b5563" dataKey={renderCustomizedLabelPercentage} stroke="none" className="label-percentage" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <Paper
                    component={Paper}
                    style={{
                        height: 'auto',
                        width: '300px',
                        marginTop: '-380px',
                        marginLeft: '60%',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        minWidth: 150,
                    }}
                >
                    <Typography variant="h6" id="tableTitle" component="div">
                        실시간 감정 랭킹
                    </Typography>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>감정</TableCell>
                                <TableCell align="right">횟수 (회)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .sort((a, b) => b.value - a.value)
                                .map((item) => (
                                    <TableRow key={item.name}>
                                        <TableCell style={{ color: '#333', marginLeft: '-30px' }}>{item.name}</TableCell>
                                        <TableCell align="right">{item.value} 회</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Paper>
            </CardBox>
        </CardBox>
    );
};

export default EmotionPieChart;
