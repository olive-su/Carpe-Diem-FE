import * as React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Box } from '@mui/material';

export default function MainLayout(props: any) {
    return (
        <div>
            <Header />
            <Box component="main" sx={{ py: 15 }}>
                {props.children}
            </Box>
            <Footer />
        </div>
    );
}
