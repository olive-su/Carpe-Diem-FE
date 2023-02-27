import { Box } from '@mui/system';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ALBUM_UPDATE_REQUEST } from '../../redux/types';
import { Paper, Typography } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { albumData } from '../../types/type';
import { Button } from '@mui/material';
import axios from 'axios';
import config from '../../config';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const theme = createTheme();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const BookButton = (props: any) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [text, setText] = useState(props.album.title);
    const [editable, setEditable] = useState(false);
    const sendEdit = () => {
        dispatch({
            type: ALBUM_UPDATE_REQUEST,
            payload: {
                album_id: props.album.albumId,
                card_id: props.album.cardId,
                cover_img_url: props.album.coverImgUrl,
                title: text,
            },
        });
        history.go(0);
    };
    const editOn = () => {
        setEditable(true);
    };
    const handleChange = (e: any) => {
        setText(e.target.value);
    };
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            setEditable(false);
            sendEdit();
        }
    };
    const onClickDelete = () => {
        axios({
            method: 'delete',
            url: `http://${config.server.host}:${config.server.port}/album/${props.album.albumId}`,
            withCredentials: true,
            data: {},
        })
            .then(function (response: any) {
                console.log(response.status);
                window.location.reload();
            })
            .catch(function (error: any) {
                console.log(error);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            {editable ? (
                <Typography variant="h6" mt={2}>
                    <input type="text" value={text} onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown} />
                    {/* <Button variant="contained">수정</Button> */}
                </Typography>
            ) : (
                <Typography noWrap={true} variant="h6" mt={2}>
                    {text}
                </Typography>
            )}
            <Typography fontSize={15}>{dayjs(props.album.createdAt).tz('utc').format('YYYY.MM.DD HH:mm:ss')}</Typography>
            <Typography ml={7}>
                <IconButton size="small" onClick={() => editOn()}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleOpen()}>
                    <DeleteIcon />
                </IconButton>
            </Typography>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        정말 삭제하시겠습니까?
                    </Typography>
                    <Typography fontSize={13} color="#64748b" id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                        삭제된 앨범의 영상은 Video 탭에서 계속 볼 수 있습니다.
                    </Typography>
                    <Typography align="right">
                        <Button onClick={onClickDelete}>확인</Button>
                        <Button onClick={handleClose}>취소</Button>
                    </Typography>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default BookButton;
