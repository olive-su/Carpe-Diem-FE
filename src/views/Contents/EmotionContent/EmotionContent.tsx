import React from 'react';
import MainLayout from '../../../components/MainLayout/MainLayout';
import EmotionLineChart from '../../Emotion/EmotionLineChart';
import EmotionPieChart from '../../Emotion/EmotionPieChart';
import html2canvas from 'html2canvas';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShareIcon from '@mui/icons-material/Share';
import { faCircleDown } from '@fortawesome/free-regular-svg-icons';
import Share from '../../Album/Share';

export default function LibraryContent() {
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
            <div id="chart">
                <EmotionLineChart />
                <EmotionPieChart />
            </div>
        </MainLayout>
    );
}
