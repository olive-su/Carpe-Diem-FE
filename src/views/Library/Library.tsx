import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Book from './Book';
import Grow from '@mui/material/Grow';
import { albumData } from '../../types/type';
import axios from 'axios';
import config from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { ALBUM_LIST_LOADING_REQUEST } from '../../redux/types';
import styled from 'styled-components';

const theme = createTheme({
    typography: {
        fontFamily: "'IBMPlexSansKR-Regular'",
    },
});

const LinkStyle = styled.div`
    text-decoration: none;
    font-family: 'IBMPlexSansKR-Regular';
`;

const userId = 'test';
const API_URL = `http://${config.server.host}:${config.server.port}`;
// const albums: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Library = () => {
    const dispatch = useDispatch();
    const { albumList } = useSelector((state: any) => state.albumList);

    // const [albums, setAlbums] = useState<any[]>([]);
    useEffect(() => {
        dispatch({
            type: ALBUM_LIST_LOADING_REQUEST,
        });
    }, [dispatch]);

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box flex={{ xs: 1 }}>
                    <Box
                        sx={{
                            pt: 8,
                            pb: 6,
                        }}
                    >
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            Album
                        </Typography>
                    </Box>
                </Box>
            </ThemeProvider>
            <Box flex={{ xs: 1 }}>
                <Grid container rowSpacing={0}>
                    {albumList?.map((data: albumData, idx: any) => (
                        <Grow in={true} key={data.albumId} {...{ timeout: 500 }}>
                            <Grid item xs={6} sm={4} md={3}>
                                <NavLink to={`/album/${data.albumId}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <Book album={data} />
                                </NavLink>
                            </Grid>
                        </Grow>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Library;
