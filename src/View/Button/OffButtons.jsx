import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function OffButtons() {
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            <div>
                <Button variant="outlined" size="small">
                    OFF
                </Button>
            </div>
        </Box>
    );
}