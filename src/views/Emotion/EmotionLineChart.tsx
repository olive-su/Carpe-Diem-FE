import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

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

const emotionData = {
    happy: [0, 1, 1, 2, 6, 2, 3],
    sad: [4, 2, 3, 1, 3, 0, 2],
    surprised: [2, 3, 2, 1, 3, 1, 1],
    disgusted: [1, 1, 3, 2, 4, 0, 3],
    angry: [0, 2, 4, 1, 0, 2, 4],
    fearful: [4, 0, 2, 3, 2, 2, 4],
};

const data = [
    {
        name: '일요일',
        행복해요: emotionData['happy'][0],
        슬퍼요: emotionData['sad'][0],
        놀라워요: emotionData['surprised'][0],
        힘들어요: emotionData['disgusted'][0],
        화나요: emotionData['angry'][0],
        무서워요: emotionData['fearful'][0],
    },
    {
        name: '월요일',
        행복해요: emotionData['happy'][1],
        슬퍼요: emotionData['sad'][1],
        놀라워요: emotionData['surprised'][1],
        힘들어요: emotionData['disgusted'][1],
        화나요: emotionData['angry'][1],
        무서워요: emotionData['fearful'][1],
    },
    {
        name: '화요일',
        행복해요: emotionData['happy'][2],
        슬퍼요: emotionData['sad'][2],
        놀라워요: emotionData['surprised'][2],
        힘들어요: emotionData['disgusted'][2],
        화나요: emotionData['angry'][2],
        무서워요: emotionData['fearful'][2],
    },
    {
        name: '수요일',
        행복해요: emotionData['happy'][3],
        슬퍼요: emotionData['sad'][3],
        놀라워요: emotionData['surprised'][3],
        힘들어요: emotionData['disgusted'][3],
        화나요: emotionData['angry'][3],
        무서워요: emotionData['fearful'][3],
    },
    {
        name: '목요일',
        행복해요: emotionData['happy'][4],
        슬퍼요: emotionData['sad'][4],
        놀라워요: emotionData['surprised'][4],
        힘들어요: emotionData['disgusted'][4],
        화나요: emotionData['angry'][4],
        무서워요: emotionData['fearful'][4],
    },
    {
        name: '금요일',
        행복해요: emotionData['happy'][5],
        슬퍼요: emotionData['sad'][5],
        놀라워요: emotionData['surprised'][5],
        힘들어요: emotionData['disgusted'][5],
        화나요: emotionData['angry'][5],
        무서워요: emotionData['fearful'][5],
    },
    {
        name: '토요일',
        행복해요: emotionData['happy'][6],
        슬퍼요: emotionData['sad'][6],
        놀라워요: emotionData['surprised'][6],
        힘들어요: emotionData['disgusted'][6],
        화나요: emotionData['angry'][6],
        무서워요: emotionData['fearful'][6],
    },
];

export default class emotionLineChart extends PureComponent {
    render() {
        return (
            <CardBox style={{ width: '70%', height: '500px', background: '#333', marginLeft: '15%' }}>
                <CardBox>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={700}
                            data={data}
                            margin={{
                                top: 20,
                                right: 50,
                                bottom: 50,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fill: 'white' }} tickMargin={10} />
                            <YAxis tick={{ fill: 'white' }} />
                            <Tooltip />
                            <Legend wrapperStyle={{ margin: '-2rem 1rem' }} />
                            <Line type="monotone" dataKey="행복해요" stroke="#fdba74" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="슬퍼요" stroke="#67e8f9" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="놀라워요" stroke="#fde047" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="힘들어요" stroke="#86efac" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="화나요" stroke="#fda4af" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="무서워요" stroke="#d8b4fe" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardBox>
            </CardBox>
        );
    }
}
