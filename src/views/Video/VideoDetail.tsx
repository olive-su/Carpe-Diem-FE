import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Box, cardMediaClasses } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Container } from '@mui/system';
import { Modal } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Share from '../Album/Share';
import VideoDelete from './VideoDelete';
import { CARD_LOADING_REQUEST } from '../../redux/types';
import config from '../../config';
import { faCircleDown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VideoStyle = styled.video`
    /* @media (max-width: 768px) { */
    height: 80vh;
    /* } */
`;

const VideoDetail = () => {
    const dispatch = useDispatch();
    const { cardId } = useParams();
    console.log(cardId);
    const { card } = useSelector((state: any) => state.card);
    console.log(card);

    useEffect(() => {
        dispatch({
            type: CARD_LOADING_REQUEST,
            payload: cardId,
        });
        console.log(card);
    }, []);

    return (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Modal open={true}>
                <Box
                    sx={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        position: 'absolute',
                        outline: 'none',
                        display: 'flex',
                        flexDirection: 'row',
                        // width: '800px',
                        // height: '600px',
                    }}
                >
                    <VideoStyle
                        controls
                        autoPlay
                        loop
                        poster={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${card.thumbnailUrl}`}
                        src={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${card.videoUrl}`}
                    ></VideoStyle>

                    <Box>
                        <IconButton type="button" onClick={() => history.go(-1)}>
                            <CloseIcon sx={{ color: 'white' }} />
                        </IconButton>
                        <a href={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${card.videoUrl}`} download>
                            <IconButton>
                                <FontAwesomeIcon
                                    icon={faCircleDown}
                                    style={{
                                        color: '#fff',
                                    }}
                                />
                                {/* <DownloadIcon /> */}
                            </IconButton>
                        </a>
                        <Share img={card.thumbnailUrl} comment={card.comment} videoUrl={card.videoUrl} />
                        <VideoDelete cardId={card.cardId} />
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default VideoDetail;
