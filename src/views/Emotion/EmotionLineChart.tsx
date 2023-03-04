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

const testData: any = {
    '2023-02-26': {
        happy: 0,
        sad: 0,
        surprised: 0,
        disgusted: 0,
        angry: 0,
        fearful: 0,
    },
    '2023-02-27': {
        happy: 0,
        sad: 0,
        surprised: 0,
        disgusted: 0,
        angry: 0,
        fearful: 0,
    },
    '2023-02-28': {
        happy: 1,
        sad: 0,
        surprised: 0,
        disgusted: 0,
        angry: 0,
        fearful: 0,
    },
    '2023-03-01': {
        happy: 0,
        sad: 0,
        surprised: 0,
        disgusted: 0,
        angry: 1,
        fearful: 0,
    },
    '2023-03-02': {
        happy: 4,
        sad: 1,
        surprised: 1,
        disgusted: 0,
        angry: 0,
        fearful: 0,
    },
    '2023-03-03': {
        happy: 0,
        sad: 0,
        surprised: 0,
        disgusted: 0,
        angry: 0,
        fearful: 0,
    },
    '2023-03-04': {
        happy: 0,
        sad: 1,
        surprised: 0,
        disgusted: 1,
        angry: 0,
        fearful: 0,
    },
};

let resultData: any = {
    happy: [],
    sad: [],
    surprised: [],
    disgusted: [],
    angry: [],
    fearful: [],
};

Object.keys(resultData).forEach((emotion) => {
    Object.keys(testData).forEach((date, index) => {
        resultData[emotion][index] = testData[date][emotion];
    });
});

const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const data = daysOfWeek.map((day, index) => ({
    name: day,
    행복해요: resultData['happy'][index],
    슬퍼요: resultData['sad'][index],
    놀라워요: resultData['surprised'][index],
    힘들어요: resultData['disgusted'][index],
    화나요: resultData['angry'][index],
    무서워요: resultData['fearful'][index],
}));

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
