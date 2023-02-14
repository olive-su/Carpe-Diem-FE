import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface datas {
    name: string;
    uv: number;
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
                <BarChart width={500} height={300} data={this.props.data}>
                    <XAxis dataKey="name" />
                    <Bar dataKey="uv" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
