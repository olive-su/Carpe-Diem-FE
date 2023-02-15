import React, { useState, useEffect } from 'react';
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

const theme = createTheme({
    typography: {
        fontFamily: "'IBMPlexSansKR-Regular'",
    },
});
const userId = 'test';
const API_URL = `http://${config.server.host}:${config.server.port}`;

const albums: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Library = () => {
    const [albums, setAlbums] = useState<any[]>([]);
    React.useEffect(function () {
        axios({
            url: `${API_URL}/album/${userId}`,
            method: 'get',
        })
            .then(function (result: any) {
                setAlbums(result.data);
            })
            .catch(function (error: any) {
                console.error('Album 에러발생: ', error);
            });
    }, []);
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
                    {albums.map((album: albumData) => (
                        <Grow in={true} key={album.albumId} {...{ timeout: 500 }}>
                            <Grid item xs={6} sm={4} md={3}>
                                <Book album={album} />
                            </Grid>
                        </Grow>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Library;
