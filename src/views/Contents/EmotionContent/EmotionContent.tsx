import React from 'react';
import MainLayout from '../../../components/MainLayout/MainLayout';
import EmotionLineChart from '../../Emotion/EmotionLineChart';
import EmotionPieChart from '../../Emotion/EmotionPieChart';

export default function LibraryContent() {
    return (
        <MainLayout>
            <EmotionLineChart />
            <EmotionPieChart />
        </MainLayout>
    );
}
