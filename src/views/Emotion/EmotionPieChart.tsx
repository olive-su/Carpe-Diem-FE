import React, { useCallback } from 'react';
import { ResponsiveContainer, PieChart, Pie, LabelList } from 'recharts';
import styled from 'styled-components';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';

const emotionData = {
    happy: [0, 1, 1, 2, 6, 2, 3],
    sad: [4, 2, 3, 1, 3, 0, 2],
    surprised: [2, 3, 2, 1, 3, 1, 1],
    disgusted: [1, 1, 3, 2, 4, 0, 3],
    angry: [0, 2, 4, 1, 0, 2, 4],
    fearful: [4, 0, 2, 3, 2, 2, 4],
};

const avgEmotion = {
    happy:
        emotionData['happy'][0] +
        emotionData['happy'][1] +
        emotionData['happy'][2] +
        emotionData['happy'][2] +
        emotionData['happy'][3] +
        emotionData['happy'][4] +
        emotionData['happy'][5] +
        emotionData['happy'][6],
    sad:
        emotionData['sad'][0] +
        emotionData['sad'][1] +
        emotionData['sad'][2] +
        emotionData['sad'][2] +
        emotionData['sad'][3] +
        emotionData['sad'][4] +
        emotionData['sad'][5] +
        emotionData['sad'][6],
    surprised:
        emotionData['surprised'][0] +
        emotionData['surprised'][1] +
        emotionData['surprised'][2] +
        emotionData['surprised'][2] +
        emotionData['surprised'][3] +
        emotionData['surprised'][4] +
        emotionData['surprised'][5] +
        emotionData['surprised'][6],
    disgusted:
        emotionData['disgusted'][0] +
        emotionData['disgusted'][1] +
        emotionData['disgusted'][2] +
        emotionData['disgusted'][2] +
        emotionData['disgusted'][3] +
        emotionData['disgusted'][4] +
        emotionData['disgusted'][5] +
        emotionData['disgusted'][6],
    angry:
        emotionData['angry'][0] +
        emotionData['angry'][1] +
        emotionData['angry'][2] +
        emotionData['angry'][2] +
        emotionData['angry'][3] +
        emotionData['angry'][4] +
        emotionData['angry'][5] +
        emotionData['angry'][6],
    fearful:
        emotionData['fearful'][0] +
        emotionData['fearful'][1] +
        emotionData['fearful'][2] +
        emotionData['fearful'][2] +
        emotionData['fearful'][3] +
        emotionData['fearful'][4] +
        emotionData['fearful'][5] +
        emotionData['fearful'][6],
};

const data = [
    {
        name: '😃 행복해요',
        value: avgEmotion['happy'],
        fill: '#fdba74',
    },
    {
        name: '😢 슬퍼요',
        value: avgEmotion['sad'],
        fill: '#67e8f9',
    },
    {
        name: '😳 놀라워요',
        value: avgEmotion['surprised'],
        fill: '#fde047',
    },
    {
        name: '🫠 힘들어요',
        value: avgEmotion['disgusted'],
        fill: '#86efac',
    },
    {
        name: '🤬 화나요',
        value: avgEmotion['angry'],
        fill: '#fda4af',
    },
    {
        name: '😱 무서워요',
        value: avgEmotion['fearful'],
        fill: '#d8b4fe',
    },
];

const total = Object.values(avgEmotion).reduce((a, b) => a + b, 0);

const renderCustomizedLabelPercentage = (value: any) => {
    const percentageCalculated = ((value.value / total) * 100).toFixed(2);
    return `${percentageCalculated}%`;
};

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

export default function EmotionPieChart() {
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
                <div
                    style={{
                        marginTop: '-430px',
                        marginLeft: '400px',
                    }}
                >
                    <h3 style={{ color: '#fff' }}>
                        <span style={{ fontSize: '0.6em', color: '#fff' }}>※ 일주일 단위로 갱신 ※</span>
                        <br></br>
                        <MilitaryTechOutlinedIcon sx={{ fontSize: 35 }} />
                        실시간 감정 순위
                        <MilitaryTechOutlinedIcon sx={{ fontSize: 35 }} />
                    </h3>
                    <br />

                    {data
                        .sort((a, b) => b.value - a.value)
                        .map((item) => (
                            <ul key={item.name} style={{ color: '#fff', marginLeft: '-30px' }}>
                                {item.name}({item.value}회)
                            </ul>
                        ))}
                </div>
            </CardBox>
        </CardBox>
    );
}
