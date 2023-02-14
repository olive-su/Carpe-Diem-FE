import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration, { Duration } from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';

import config from '../../config';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

const getTimeDiff = (timeToCompare: Dayjs): string => {
    const timeDiffDuration: Duration = dayjs.duration(dayjs().diff(timeToCompare));
    const hourDiff: number = parseInt(timeDiffDuration.format('H'));
    const minuteDiff: number = parseInt(timeDiffDuration.format('m'));
    const secondDiff: number = parseInt(timeDiffDuration.format('s'));

    const hourDiffString: string = hourDiff === 0 ? '' : `${hourDiff}시간 `;
    const minuteDiffString: string = minuteDiff === 0 ? '' : `${minuteDiff}분 `;

    return `${hourDiffString}${minuteDiffString}${secondDiff}초 전`;
};

export default function InteractiveCard(properties: any) {
    // console.log('properties', properties);
    const videoList = properties;
    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                width: 400,
                gap: 2,
                my: 2,
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
        >
            <AspectRatio ratio="1" sx={{ width: 90 }}>
                <img
                    src={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${properties.properties.thumbnailUrl}`}
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <div>
                <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
                    {videoList.properties.comment}
                </Typography>
                <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
                    <Link overlay underline="none" href="#interactive-card" sx={{ color: 'text.tertiary' }}>
                        {getTimeDiff(dayjs(videoList.properties.createdAt))}
                    </Link>
                </Typography>
                <Chip variant="outlined" color="primary" size="sm" sx={{ pointerEvents: 'none' }}>
                    {videoList.properties.expressionLabel}
                </Chip>
            </div>
        </Card>
    );
}
