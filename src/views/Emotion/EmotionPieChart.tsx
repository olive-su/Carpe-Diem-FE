import React, { useCallback } from 'react';
import { ResponsiveContainer, PieChart, Pie, LabelList } from 'recharts';
import styled from 'styled-components';
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
};

export default EmotionPieChart;
