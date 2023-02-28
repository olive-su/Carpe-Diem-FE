import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import dayjs from 'dayjs';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import OutletIcon from '@mui/icons-material/Outlet';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import SickIcon from '@mui/icons-material/Sick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { Typography, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
};

export default function AlbumCarousel(props: any) {
    console.log('Carousel', props.cardInfo);
    const emotionType: any = (): any => {
        if (props.cardInfo.expressionLabel == 'happy') {
            return <InsertEmoticonIcon />;
        } else if (props.cardInfo.expressionLabel == 'angry') {
            return <LocalFireDepartmentIcon />;
        } else if (props.cardInfo.expressionLabel == 'fearful') {
            return <SentimentVeryDissatisfiedRoundedIcon />;
        } else if (props.cardInfo.expressionLabel == 'surprised') {
            return <OutletIcon />;
        } else if (props.cardInfo.expressionLabel == 'sad') {
            return <SentimentDissatisfiedIcon />;
        } else if (props.cardInfo.expressionLabel == 'disgusted') {
            return <SickIcon />;
        }
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const ref: any = useRef(null);
    const [text, setText] = useState(props.cardInfo.comment);
    const [editable, setEditable] = useState(false);

    const editOn = () => {
        setEditable(true);
        setText(props.cardInfo.comment);
    };

    const handleChange = (e: any) => {
        setText(e.target.value);
    };

    const handleClickOutside = (e: any) => {
        if (editable === true && !ref.current.contains(e.target)) setEditable(false);
    };
    useEffect(() => {
        window.addEventListener('click', handleClickOutside, true);
    });

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            setEditable(false);
            props.cardInfo.comment = text;
        }
    };

    const onClickDelete = () => {
        console.log();
    };
    return (
        <div>
            <h3 style={{ fontSize: '15px', textAlign: 'center', paddingTop: '5px' }}>
                {' '}
                {dayjs(props.cardInfo.createdAt).tz('utc').format('YYYY년 MM월 DD일')}
            </h3>
            <div>
                <video
                    controls
                    loop
                    src={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${props.cardInfo.videoUrl}`}
                    width="500px"
                    height="380px"
                ></video>
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <span style={{ marginRight: '10px' }}>
                    {emotionType()}
                    {props.cardInfo.expressionLabel}
                </span>
                <span>
                    {editable ? (
                        <span>
                            <form>
                                <input type="text" maxLength={25} value={text} onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown} />
                            </form>{' '}
                        </span>
                    ) : (
                        <span>{props.cardInfo.comment}</span>
                    )}
                </span>
                <button
                    type="button"
                    onClick={editOn}
                    style={{
                        borderRadius: '50%',
                        border: '1.5px solid #333',
                        boxShadow: '3px 3px 1px gray',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        marginLeft: '10px',
                    }}
                >
                    <FontAwesomeIcon icon={faEdit} size="lg" style={{ color: '#1d1d1d' }} />
                </button>

                <button
                    onClick={handleOpen}
                    style={{
                        borderRadius: '50%',
                        border: '1.5px solid #333',
                        boxShadow: '3px 3px 1px gray',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        marginLeft: '10px',
                    }}
                >
                    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </button>
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            정말 삭제하시겠습니까?
                        </Typography>
                        <Typography fontSize={13} color="#64748b" id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                            삭제된 앨범의 영상은 Video 탭에서 계속 볼 수 있습니다.
                        </Typography>
                        <Typography align="right">
                            <Link to="/album">
                                <Button onClick={onClickDelete}>확인</Button>
                            </Link>
                            <Button onClick={handleClose}>취소</Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}
