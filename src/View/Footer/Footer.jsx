import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import { display } from '@mui/system';
import styled from 'styled-components';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Footer() {
    const Div = styled.div`
        display: flex;
        background-color: blue;
        justify-content: space-between;
    `;

    return (
        <Box component="footer" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <Grid component="h2" variant="h5" color="inherit" sx={{ justifyContent: 'space-between', overflowX: 'auto' }} noWrap> */}
            <Typography>
                <img src="imgs/logotitle.png" width={180} fontSize={10} />

            </Typography>
            <Typography color="#3366cc" component="h2" variant="h5" >
                KDS / KSK / LJY / JSW / HSH
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button>
                        <GitHubIcon fontSize="large" sx={{ color: '#797395' }} />
                    </Button>
                    <Button>
                        <YouTubeIcon fontSize="large" sx={{ color: 'red' }} />
                    </Button>
                </Box>
            </Typography>
            {/* <Typography component="h2" variant="h5" color="inherit" noWrap sx={{ flex: 1 }}>
        //                 KSK
        //                 </Typography>
        //                 <Typography component="h2" variant="h5" color="inherit" noWrap sx={{ flex: 1 }}>
        //                 LJY
        //                 </Typography>
        //                 <Typography component="h2" variant="h5" color="inherit" noWrap sx={{ flex: 1 }}>
        //                 JSW
        //                 </Typography>
        //                 <Typography variant="subtitle1" align="right" component="p" spacing="">
        //                 HSH
        //             </Typography> */}

            {/* <Typography variant="subtitle1" align="right" component="p" spacing="">
        //         <Button>
        //             <GitHubIcon fontSize="large" sx={{ color: '#797395' }} />
        //         </Button>
        //         <Button>
        //             <YouTubeIcon fontSize="large" sx={{ color: 'red' }} />
        //         </Button>
        //     </Typography> */}
        </Box>
    );
}

Footer.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Footer;
