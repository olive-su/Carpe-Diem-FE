/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardCover from '@mui/joy/CardCover';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import { ToggleButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';
import IndeterminateCheckbox from './Checkbox';
import axios from 'axios';
import { connect } from 'react-redux';
import { setCard, filterOn, filterOut } from '../../reducer/cardsReducer';
import '../../styles/App.css';
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const API_URL = 'http://localhost:4000';
const theme = createTheme();
const userId = 'test';

// import styled from 'styled-components';
// const StyleContent = styled.div`
//     background-color: #f1f5f9;
//     font-family: GangwonEduPowerExtraBoldA;
//     display: flex;

//     text-align: center;
// `;
// const WebcamContent = styled.section`
//     margin: auto;
// `;

const Album = (filteredCards: any) => {
    const [cards, setCards] = React.useState([]);
    React.useEffect(function () {
        axios({
            url: `${API_URL}/card/${userId}`,
            method: 'get',
        })
            .then(function (result) {
                setCards(result.data);
            })
            .catch(function (error) {
                console.error('card 에러발생: ', error);
            });
    }, []);
    filteredCards.setCard(cards);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            Video
                        </Typography>
                        {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not
                            too short so folks don&apos;t simply skip over it entirely.
                        </Typography> */}
                        <IndeterminateCheckbox />
                    </Container>
                </Box>
                <Container sx={{ py: 2 }}>
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {filteredCards.filteredCards.cardsReducer.map((card: any) => (
                            <Grid item key={card.cardId} xs={6} sm={4} md={3}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', borderRadius: '12px' }}
                                    onMouseOver={() => {
                                        const hz: HTMLVideoElement = document.getElementById(String(card.cardId)) as HTMLVideoElement;

                                        const playPromise = hz.play();
                                        if (playPromise !== undefined) {
                                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                            playPromise.then((_: any) => {}).catch((error: any) => {});
                                        }
                                    }}
                                    onMouseOut={() => {
                                        const hz: HTMLVideoElement = document.getElementById(String(card.cardId)) as HTMLVideoElement;
                                        hz.load();
                                    }}
                                >
                                    <CardCover
                                        sx={{
                                            background:
                                                'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                                        }}
                                    >
                                        {/* <video id={String(card)} loop poster="https://source.unsplash.com/random">
                                            <source src="https://assets.codepen.io/6093409/river.mp4" type="video/mp4" />
                                        </video> */}
                                        <video id={String(card.cardId)} loop poster={card.thumbnailUrl}>
                                            <source src={card.videoUrl} type="video/webm" />
                                        </video>
                                    </CardCover>
                                    <CardCover
                                        sx={{
                                            background:
                                                'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 100px)',
                                        }}
                                    />
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            width: '120',
                                            height: '250px',
                                            objectFit: 'fill',
                                        }}
                                        alt="img"
                                    />

                                    {/* <CardMedia
                                            component="img"
                                            sx={{
                                                // 16:9
                                                width: '120',
                                                height: '250px',
                                                objectFit: 'fill',
                                            }}
                                            alt="random"
                                        /> */}
                                    {/* <h2>Heading</h2>
                                    <div>This is a media card. You can use this section to describe the content.</div> */}
                                    <Box
                                        sx={{
                                            bottom: '0%',
                                            width: '100%',
                                            textAlign: 'center',
                                            position: 'absolute',
                                            color: 'white',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {/* <Typography mt={5} ml={2} fontSize={10} color="#d1d5db">
                                                2023.02.07
                                            </Typography> */}
                                            <Typography mt={5} ml={2} fontSize={10} color="#d1d5db">
                                                {card.createdAt}
                                            </Typography>
                                            <Typography mr={2} mt={2} variant="h5" component="h2">
                                                {card.expressionLabel}
                                            </Typography>
                                        </Box>
                                        {/* <Typography noWrap={true} color="#e5e7eb" mb={2} ml={2} mr={2}>
                                            This is a media card. You can use this section to describe the content.
                                        </Typography> */}
                                        <Typography noWrap={true} color="#e5e7eb" mb={2} ml={2} mr={2}>
                                            {card.comment}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
};
function StateToProps(state: any) {
    return { filteredCards: state };
}

function mapDispatchToProps(dispatch: any) {
    return {
        setCard: (cards: any) => dispatch(setCard(cards)),
        filterOn: (filter: any) => dispatch(filterOn(filter)),
        filterOut: (filter: any) => dispatch(filterOut(filter)),
    };
}

export default connect(StateToProps, mapDispatchToProps)(Album);
