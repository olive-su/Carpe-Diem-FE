/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardCover from '@mui/joy/CardCover';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ToggleButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import OutletIcon from '@mui/icons-material/Outlet';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import SickIcon from '@mui/icons-material/Sick';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { cardData } from '../../types/type';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
//import IndeterminateCheckbox from './Checkbox';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { setCard, filterOn, filterOut } from '../../reducer/cardsReducer';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const API_URL = 'http://localhost:4000';
const theme = createTheme({
    typography: {
        fontFamily: "'IBMPlexSansKR-Regular'",
    },
});
const userId = 'test';
dayjs.extend(utc);
dayjs.extend(timezone);
// import styled from 'styled-components';
// const StyleContent = styled.div`
//     background-color: #f1f5f9;
//     font-family: IBMPlexSansKR-Regular;
//     display: flex;

//     text-align: center;
// `;
// const WebcamContent = styled.section`
//     margin: auto;
// `;
let allCard: any[] = [];
const Album = () => {
    const [cards, setCards] = useState<any[]>([]);
    React.useEffect(function () {
        axios({
            url: `${API_URL}/card/${userId}`,
            method: 'get',
        })
            .then(function (result) {
                setCards(result.data);
                allCard = result.data;
            })
            .catch(function (error) {
                console.error('card 에러발생: ', error);
            });
    }, []);
    const [option, setOption] = React.useState('Newest');
    const [checked, setChecked] = React.useState([true, true, true, true, true, true]);
    if (option == 'Newest') {
        cards.sort((a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt)));
    }

    const handleChange = (event: any) => {
        setOption(event.target.value);
        if (option == 'Newest') {
            cards.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)));
        } else {
            cards.sort((a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt)));
        }
    };
    const handleChange1 = (event: any) => {
        setChecked([
            event.target.checked,
            event.target.checked,
            event.target.checked,
            event.target.checked,
            event.target.checked,
            event.target.checked,
        ]);
        if (checked[0] && checked[1] && checked[2] && checked[3] && checked[4] && checked[5]) {
            setCards([]);
            setOption('Newest');
        } else {
            setCards(allCard);
        }
    };

    /*
    
    useState : 기존값 불러온다
    setChecked()
const handleClickc = () => {
    setState(false)
} 
    setState(false)

    */

    const handleChange2 = () => {
        setChecked([!checked[0], checked[1], checked[2], checked[3], checked[4], checked[5]]);
        if (checked[0]) {
            setCards(cards.filter((card: cardData) => card.expressionLabel !== 'happy'));
        } else {
            setCards(cards.concat(allCard.filter((card: cardData) => card.expressionLabel === 'happy')));
        }
    };

    const handleChange3 = () => {
        setChecked([checked[0], !checked[1], checked[2], checked[3], checked[4], checked[5]]);
        if (checked[1]) {
            setCards(cards.filter((card: cardData) => card.expressionLabel !== 'sad'));
        } else {
            setCards(cards.concat(allCard.filter((card: cardData) => card.expressionLabel === 'sad')));
        }
    };
    const handleChange4 = () => {
        setChecked([checked[0], checked[1], !checked[2], checked[3], checked[4], checked[5]]);
        if (checked[2]) {
            setCards(cards.filter((card: cardData) => card.expressionLabel !== 'angry'));
        } else {
            setCards(cards.concat(allCard.filter((card: cardData) => card.expressionLabel === 'angry')));
        }
    };
    const handleChange5 = () => {
        setChecked([checked[0], checked[1], checked[2], !checked[3], checked[4], checked[5]]);
        if (checked[3]) {
            setCards(cards.filter((card: cardData) => card.expressionLabel !== 'disgusted'));
        } else {
            setCards(cards.concat(allCard.filter((card: cardData) => card.expressionLabel === 'disgusted')));
        }
    };
    const handleChange6 = () => {
        setChecked([checked[0], checked[1], checked[2], checked[3], !checked[4], checked[5]]);
        if (checked[4]) {
            setCards(cards.filter((card: cardData) => card.expressionLabel !== 'fearful'));
        } else {
            setCards(cards.concat(allCard.filter((card: cardData) => card.expressionLabel === 'fearful')));
        }
    };
    const handleChange7 = () => {
        setChecked([checked[0], checked[1], checked[2], checked[3], checked[4], !checked[5]]);
        if (checked[5]) {
            setCards(cards.filter((card: cardData) => card.expressionLabel !== 'surprised'));
        } else {
            setCards(cards.concat(allCard.filter((card: cardData) => card.expressionLabel === 'surprised')));
        }
    };

    const children = (
        // <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        //     <FormControlLabel label="Child 1" control={<Checkbox checked={checked[0]} onChange={handleChange2} />} />
        //     <FormControlLabel label="Child 2" control={<Checkbox checked={checked[1]} onChange={handleChange3} />} />
        //     <FormControlLabel label="Child 3" control={<Checkbox checked={checked[2]} onChange={handleChange4} />} />
        //     <FormControlLabel label="Child 4" control={<Checkbox checked={checked[3]} onChange={handleChange5} />} />
        // </Box>
        <Stack sx={{ pt: 4, pl: 10 }} direction="row" spacing={2} justifyContent="center">
            <FormControl sx={{ ml: -10, minWidth: 130 }}>
                <Select
                    value={option}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ border: 1, borderColor: '#60a5fa' }}
                >
                    <MenuItem value={'Newest'}>Newest</MenuItem>
                    <MenuItem value={'Oldest'}>Oldest</MenuItem>
                </Select>
            </FormControl>
            <ToggleButton value="check" selected={checked[0]} onChange={handleChange2}>
                <InsertEmoticonIcon /> Happy
            </ToggleButton>
            <ToggleButton value="check" selected={checked[1]} onChange={handleChange3}>
                <SentimentDissatisfiedIcon />
                Sad
            </ToggleButton>
            <ToggleButton value="check" selected={checked[2]} onChange={handleChange4}>
                <LocalFireDepartmentIcon /> Angry
            </ToggleButton>
            <ToggleButton value="check" selected={checked[3]} onChange={handleChange5}>
                <SickIcon />
                Disgusted
            </ToggleButton>
            <ToggleButton value="check" selected={checked[4]} onChange={handleChange6}>
                <SentimentVeryDissatisfiedRoundedIcon />
                Fearful
            </ToggleButton>
            <ToggleButton value="check" selected={checked[5]} onChange={handleChange7}>
                <OutletIcon />
                Surprised
            </ToggleButton>
        </Stack>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main style={{ fontFamily: 'IBM Plex Sans KR' }}>
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
                        <Box>
                            <FormControlLabel
                                label="전체선택"
                                control={
                                    <Checkbox
                                        checked={checked[0] && checked[1] && checked[2] && checked[3] && checked[4] && checked[5]}
                                        onChange={handleChange1}
                                    />
                                }
                                sx={{ mt: 3, ml: 3 }}
                            />
                            {children}
                        </Box>
                    </Container>
                </Box>
                <Container sx={{ width: '1000px', height: '1000px', py: 2 }}>
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card: any) => (
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
                                    // sx={{
                                    //     background:
                                    //         'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                                    // }}
                                    >
                                        {/* <video id={String(card)} loop poster="https://source.unsplash.com/random">
                                            <source src="https://assets.codepen.io/6093409/river.mp4" type="video/mp4" />
                                        </video> */}
                                        <video
                                            id={String(card.cardId)}
                                            loop
                                            poster={card.thumbnailUrl ? card.thumbnailUrl : './imgs/not_found_files.png'}
                                        >
                                            <source src={card.videoUrl} type="video/webm" />
                                        </video>
                                    </CardCover>
                                    <CardCover
                                        sx={{
                                            background:
                                                'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 100px), linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 200px)',
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
                                        image="./imgs/not_found_files.jpg"
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
                                            <Typography mt={5} ml={1} fontSize={10} color="#d1d5db">
                                                {dayjs(card.createdAt).tz('utc').format('YYYY.MM.DD HH:mm:ss')}
                                            </Typography>
                                            <Typography mr={0} mt={2} variant="h5" component="h2">
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
// function StateToProps(state: any) {
//     return { filteredCards: state };
// }

// function mapDispatchToProps(dispatch: any) {
//     return {
//         setCard: (cards: any) => dispatch(setCard(cards)),
//         filterOn: (filter: any) => dispatch(filterOn(filter)),
//         filterOut: (filter: any) => dispatch(filterOut(filter)),
//     };
// }

// export default connect(StateToProps, mapDispatchToProps)(Album);

export default Album;
