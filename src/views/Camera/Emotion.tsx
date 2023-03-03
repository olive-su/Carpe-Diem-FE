import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, Legend, ResponsiveContainer } from 'recharts';

interface datas {
    name: string;
    neutral: number;
    happy: number;
    sad: number;
    surprised: number;
    disgusted: number;
    angry: number;
    fearful: number;
}
interface data {
    data: datas[];
}
export default class Emotion extends PureComponent<data> {
    static defaultProps = {
        data: [{}],
    };

    render() {
        return (
            <ResponsiveContainer width="100%" height="20%">
                <BarChart width={500} height={300} data={this.props.data} barGap={50}>
                    <XAxis dataKey="Emotion" />
                    <Bar dataKey="neutral" fill="gray" />
                    <Bar dataKey="happy" fill="#FDBA74" />
                    <Bar dataKey="sad" fill="#67E8F9" />
                    <Bar dataKey="surprised" fill="#FDA4AF" />
                    <Bar dataKey="disgusted" fill="#86EFAC" />
                    <Bar dataKey="angry" fill="#FDE047" />
                    <Bar dataKey="fearful" fill="#D8B4FE" />
                    <Legend wrapperStyle={{ margin: '-1rem 0rem' }} iconSize={20} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
