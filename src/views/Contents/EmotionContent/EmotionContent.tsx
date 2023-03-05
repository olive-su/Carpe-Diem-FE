import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '../../../components/MainLayout/MainLayout';
import EmotionLineChart from '../../Emotion/EmotionLineChart';
import EmotionPieChart from '../../Emotion/EmotionPieChart';

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

    return (
        <MainLayout>
            <EmotionLineChart data={data} />
            <EmotionPieChart data={data} sumEmotion={sumEmotion} />
        </MainLayout>
    );
}
