/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { red } from '@mui/material/colors';

import Card from '@mui/material/Card';
import CardCover from '@mui/joy/CardCover';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Modal } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import Backdrop from '@mui/material/Backdrop';

import dayjs from 'dayjs';
import axios from 'axios';
import styled from 'styled-components';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import CloseIcon from '@mui/icons-material/Close';

import config from '../../config';
import { ALBUM_CREATE_REQUEST } from '../../redux/types';
import Share from '../Album/Share';
import VideoDelete from './VideoDelete';
import { useDispatch } from 'react-redux';

const CheckboxStyle = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
`;

const ClearCard = styled.div`
    background-position: center;
    background-size: cover;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 1rem 2rem #333;
    text-align: center;
    border-radius: 1rem;
    padding: 1rem;
    backdrop-filter: blur(0.4rem);
    -webkit-box-reflect: below 1px linear-gradient(transparent, transparent, #0004);
    margin-top: 20px;
`;

let allCard: any[] = [];
const Video = () => {
    const dispatch = useDispatch();
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
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [checkedListAlbum, setCheckedListAlbum]: any = useState({});
    // 체크시 데이터 저장, 체크 해제시 데이터 삭제
    const onCheckedElement = (checked: boolean, item: any) => {
        if (checked) {
            checkedListAlbum[item.cardId] = item; // CHECK
            // const thumbnail = (checkedListAlbum[item.thumbnailUrl] = item);
            setCheckedListAlbum({ ...checkedListAlbum });
        } else if (!checked) {
            onRemoveChecked(item);
        }
    };

    const [titleInput, setTitleInput]: any = useState('');

    const onKeyPress = (e: any) => {
        if (e.key == 'Enter') {
            alert('title이 저장되었습니다.');
        }
    };

    // 체크 해제 데이터 삭제
    const onRemoveChecked = (item: any) => {
        delete checkedListAlbum[item.cardId];
        setCheckedListAlbum({ ...checkedListAlbum });
    };

    const [id, setId] = useState('');
    const [thumbnailUrl, setThumbnamilUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="lg">
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', p: '4px 0px', mt: '20px', mb: '20px' }}>Video</Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    border: '3px solid rgba(255,255,255,0.5)',
                    borderRadius: '6px',
                }}
            >
                <Accordion style={{ backgroundColor: 'transparent', flex: '1' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'var(--black)' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ color: 'var(--black)' }}>앨범에 추가할 비디오 확인하기</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{
                                backgroundColor: '#e5e7eb',

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
                                return (
                                    <div key={list}>
                                        <Card sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column' }}>
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
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
                            placeholder="앨범의 title을 입력하세요."
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
                                dispatch({
                                    type: ALBUM_CREATE_REQUEST,
                                    payload: {
                                        title: titleInput,
                                        card_id: Object.keys(checkedListAlbum),
                                    },
                                });
                                history.go(0);
                            }}
                        >
                            앨범 만들기
                        </button>
                    </Box>
                </Accordion>
            </Box>
            <Grid container spacing={1} sx={{ mt: '20px' }}>
                {cards.map((card: any) => (
                    <Grid item key={card.cardId} xs={12} sm={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', borderRadius: '0px' }}
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
                                                muted
                                                poster={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${card.thumbnailUrl}`}
                                            >
                                                <source
                                                    src={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${card.videoUrl}`}
                                                    type="video/webm"
                                                />
                                            </video>
                                        </CardCover>
                                        <CardCover
                                            sx={{
                                                background:
                                                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 100px), linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 200px)',
                                            }}
                                        />
                                        {/* <label>
                                            <input
                                                type="checkbox"
                                                style={{ position: 'absolute', top: '0px', right: '0px' }}
                                                onClick={(e) => e.stopPropagation()}
                                                value={card.cardId}
                                                onChange={(event) => onCheckedElement(event.target.checked, card.cardId)}
                                                checked={checkedListAlbum.includes(card.cardId) ? true : false}
                                            />
                                        </label> */}
                                        {/* <CheckboxStyle>
                                            <Checkbox
                                                onClick={(e) => e.stopPropagation()}
                                                value={card.cardId}
                                                onChange={(event) => onCheckedElement(event.target.checked, card.cardId)}
                                                checked={checkedListAlbum.includes(card.cardId) ? true : false}
                                                {...label}
                                                defaultChecked
                                                sx={{
                                                    color: red[800],
                                                    '&.Mui-checked': {
                                                        color: red[600],
                                                    },
                                                }}
                                                // 하트
                                                // icon={<FavoriteBorder sx={{fontSize:'40px'}}/>}
                                                // checkedIcon={<Favorite sx={{fontSize:'40px'}} />}
                                                // 책갈피
                                                icon={<BookmarkBorderIcon sx={{ fontSize: '40px' }} />}
                                                checkedIcon={<BookmarkIcon sx={{ fontSize: '40px' }} />}
                                            />
                                        </CheckboxStyle> */}
                                        <CheckboxStyle>
                                            <Checkbox
                                                onClick={(e) => e.stopPropagation()}
                                                value={card.cardId}
                                                checked={checkedListAlbum[card.cardId] !== undefined ? true : false}
                                                onChange={(event) => onCheckedElement(event.target.checked, card)}
                                                {...label}
                                                defaultChecked
                                                sx={{
                                                    color: red[800],
                                                    '&.Mui-checked': {
                                                        color: red[600],
                                                    },
                                                }}
                                                // 하트
                                                // icon={<FavoriteBorder sx={{fontSize:'40px'}}/>}
                                                // checkedIcon={<Favorite sx={{fontSize:'40px'}} />}
                                                // 책갈피
                                                icon={<BookmarkBorderIcon sx={{ fontSize: '40px' }} />}
                                                checkedIcon={<BookmarkIcon sx={{ fontSize: '40px' }} />}
                                            />
                                        </CheckboxStyle>

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
                                                <Typography mr={1} mt={2} variant="h6" component="h2">
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
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
};

export default Video;
