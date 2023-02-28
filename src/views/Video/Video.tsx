/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import Card from '@mui/material/Card';
import CardCover from '@mui/joy/CardCover';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { listClasses, listItemSecondaryActionClasses, ToggleButton } from '@mui/material';
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
import config from '../../config';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Height } from '@mui/icons-material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { red } from '@mui/material/colors';
import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List } from 'semantic-ui-react';

// import { connect } from 'react-redux';
// import { setCard, filterOn, filterOut } from '../../reducer/cardsReducer';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const API_URL = `http://${config.server.host}:${config.server.port}`;
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
            method: 'get',
            url: `http://${config.server.host}:${config.server.port}/card`,
            withCredentials: true,
        })
            .then(function (result) {
                console.log('dafsfasdffsfdsaafsd', result.data);
                setCards(result.data);
                allCard = result.data;
            })
            .catch(function (error) {
                console.log(`http://${config.server.host}:${config.server.port}/card`);
                console.error('card 에러발생: ', error);
            });
    }, []);
    const [option, setOption] = React.useState('Newest');
    const [checked, setChecked] = React.useState([true, true, true, true, true, true]);
    if (option == 'Newest') {
        cards.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)));
    }

    const handleChange = (event: any) => {
        setOption(event.target.value);
        if (option == 'Oldest') {
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
                    sx={{ border: 1, borderColor: '#60a5fa', backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
                >
                    <MenuItem value={'Newest'}>Newest</MenuItem>
                    <MenuItem value={'Oldest'}>Oldest</MenuItem>
                </Select>
            </FormControl>
            <FormControlLabel
                label="ALL"
                control={
                    <Checkbox checked={checked[0] && checked[1] && checked[2] && checked[3] && checked[4] && checked[5]} onChange={handleChange1} />
                }
                sx={{ mt: 3, ml: 3, paddingRight: '20px', border: '1px solid lightgrey', borderRadius: '2px' }}
            />
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
    const [checkedListAlbum, setCheckedListAlbum]: any = useState({});
    // 체크시 데이터 저장, 체크 해제시 데이터 삭제
    const onCheckedElement = (checked: boolean, item: any) => {
        console.log('ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ', Object.keys(checkedListAlbum));
        if (checked) {
            checkedListAlbum[item.cardId] = item; // CHECK
            // const thumbnail = (checkedListAlbum[item.thumbnailUrl] = item);
            setCheckedListAlbum({ ...checkedListAlbum });
        } else if (!checked) {
            onRemoveChecked(item);
        }
    };

    // 체크 해제 데이터 삭제
    const onRemoveChecked = (item: any) => {
        delete checkedListAlbum[item.cardId];
        setCheckedListAlbum({ ...checkedListAlbum });
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const CheckboxStyle = styled.div`
        position: absolute;
        top: 0px;
        right: 0px;
    `;

    const [titleInput, setTitleInput]: any = useState('');

    const onKeyPress = (e: any) => {
        if (e.key == 'Enter') {
            alert('title이 저장되었습니다.');
        }
    };

    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        console.log('>>> source', source);
        console.log('>>> destination', destination);
        console.log('>>> draggableId', draggableId);
        console.log('***', Object.keys(checkedListAlbum));

        if (!destination) return;
        Object.keys(checkedListAlbum).splice(source.index, 1);
        Object.keys(checkedListAlbum).splice(destination?.index, 0, draggableId);
    };

    // --- requestAnimationFrame 초기화
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main style={{ fontFamily: 'IBMPlexSansKR-Regular' }}>
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

                        <Accordion style={{ backgroundColor: '#e5e7eb', right: '36%' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{ display: 'flex' }}
                            >
                                <Typography>앨범에 추가할 비디오 확인하기</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography
                                    style={{
                                        backgroundColor: '#f1f5f9',
                                        borderRadius: '3px',
                                        display: 'flex',
                                        margin: '0 auto',
                                        paddingTop: '10px',
                                        overflow: 'scroll',
                                        flexDirection: 'row',
                                        position: 'relative',
                                    }}
                                >
                                    {Object.keys(checkedListAlbum).length === 0 && <div style={{ color: 'grey' }}>{'선택한 비디오가 없습니다'}</div>}
                                    {Object.keys(checkedListAlbum).map((list: any) => {
                                        console.log('asfsa ', checkedListAlbum);
                                        console.log('222', Object.keys(checkedListAlbum)[0]);
                                        console.log('222', checkedListAlbum[Object.keys(checkedListAlbum)[0]]);
                                        console.log('', checkedListAlbum[Object.keys(checkedListAlbum)[0]].thumbnailUrl);
                                        console.log('1111', checkedListAlbum[list].thumbnailUrl);
                                        return (
                                            <div key={list}>
                                                <Card>
                                                    <div style={{ marginLeft: '10px', marginBottom: '10px' }}>
                                                        <img
                                                            src={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${checkedListAlbum[list].thumbnailUrl}`}
                                                            style={{
                                                                width: '170px',
                                                                height: '120px',
                                                            }}
                                                        />
                                                        {/* <span style={{ display: 'none' }}>{list}</span> */}
                                                    </div>
                                                    <FontAwesomeIcon
                                                        onClick={() => onRemoveChecked(checkedListAlbum[list])}
                                                        icon={faTrashAlt}
                                                        size="sm"
                                                        style={{ color: 'grey', cursor: 'pointer' }}
                                                    />
                                                </Card>
                                            </div>
                                        );
                                    })}
                                </Typography>
                            </AccordionDetails>

                            <input
                                type="text"
                                style={{
                                    outline: 'none',
                                    borderRadius: '3px',
                                    border: '1.5px thin #221718',
                                    fontSize: '16px',
                                    boxShadow: '3px 3px 1px lightgray',
                                    paddingLeft: '10px',
                                    marginBottom: '20px',
                                    width: '400px',
                                    textAlign: 'center',
                                    marginRight: '10px',
                                    backgroundColor: '#F1F5F9',
                                }}
                                placeholder="앨범의 title을 입력"
                                onChange={(e) => {
                                    setTitleInput(e.target.value);
                                }}
                                onKeyDown={onKeyPress}
                            ></input>

                            <button
                                type="button"
                                style={{
                                    outline: 'none',
                                    borderRadius: '3px',
                                    border: '0.1px thin black',
                                    fontSize: '16px',
                                    boxShadow: '3px 3px 1px lightgray',
                                    paddingLeft: '10px',
                                    marginBottom: '20px',
                                    textAlign: 'center',
                                }}
                                onClick={() => {
                                    axios({
                                        method: 'post',
                                        url: `http://${config.server.host}:${config.server.port}/album`,
                                        withCredentials: true,
                                        data: {
                                            title: titleInput,
                                            card_id: Object.keys(checkedListAlbum),
                                            cover_img_url: checkedListAlbum[Object.keys(checkedListAlbum)[0]].thumbnailUrl,
                                        },
                                    })
                                        .then(function (result) {
                                            console.log(result);
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                    alert('앨범이 생성되었습니다.');
                                    window.location.reload();
                                }}
                            >
                                앨범 만들기
                            </button>
                        </Accordion>

                        <Box>{children}</Box>
                    </Container>
                </Box>
                <Container sx={{ width: '1000px', height: 'auto', py: 2 }}>
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card: any) => (
                            <Grid item key={card.cardId} xs={6} sm={4} md={3}>
                                <Link to={`/video/${card.cardId}`}>
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
                                        <CardCover>
                                            <video
                                                id={String(card.cardId)}
                                                loop
                                                muted
                                                poster={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${card.thumbnailUrl}`}
                                            >
                                                <source
                                                    src={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${card.videoUrl}`}
                                                    type="video/webm"
                                                />
                                            </video>
                                        </CardCover>

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
                                                <Typography mt={5} ml={1} fontSize={10} color="#d1d5db">
                                                    {dayjs(card.createdAt).tz('utc').format('YYYY.MM.DD HH:mm:ss')}
                                                </Typography>
                                                <Typography mr={1} mt={2} variant="h6" component="h2">
                                                    {card.expressionLabel}
                                                </Typography>
                                            </Box>

                                            <Typography noWrap={true} color="#e5e7eb" mb={2} ml={2} mr={2}>
                                                {card.comment}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Link>
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
