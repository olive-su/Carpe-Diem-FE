import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

import config from '../../config';

export default function InteractiveCard(properties: any) {
    console.log('properties', properties);
    const videoList = properties;
    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                width: 800,
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
                        {videoList.properties.createdAt}
                    </Link>
                </Typography>
                <Chip variant="outlined" color="primary" size="sm" sx={{ pointerEvents: 'none' }}>
                    {videoList.properties.expressionLabel}
                </Chip>
            </div>
        </Card>
    );
}
