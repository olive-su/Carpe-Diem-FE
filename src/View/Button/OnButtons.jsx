import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';

export default function OnButtons() {
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            <div>
                <Button variant="outlined" size="small" sx={{ borderColor: 'red', color: 'red' }}>
                    ON
                </Button>
            </div>
        </Box>
    );
}