import React, { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { border, color, Container, display, margin, maxHeight, maxWidth } from '@mui/system';
import axios from 'axios';
import config from '../../config';
import styled from 'styled-components';
import { CiEdit } from 'react-icons/ci';

import { Link } from 'react-router-dom';
import { Button, Card, Box, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faImage } from '@fortawesome/free-regular-svg-icons';
import Modal from '@mui/material/Modal';
import ImageUploader from 'react-images-upload';

const Profile = styled.img`
    display: flex;
    width: 150px;
    height: 150px;
    border-radius: 100%;
`;

const Profile2 = styled.img`
    display: flex;
    width: 400px;
    // height: 150px;
    // border-radius: 100%;
`;

const CardBox = styled.div`
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 400%;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 1rem 2rem #333;
    text-align: center;
    border-radius: 1rem;
    padding: 1rem;
    backdrop-filter: blur(0.4rem);
`;

const Style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '4px solid #000',
    borderRadius: '1rem',
    p: 7,
};

const Close = styled.div`
    width: 200px;
    border: none;
    background-color: transparent;
    font-size: 24px;
    cursor: pointer;
    opacity: 0.5; /* Add opacity to make the icon appear dimly */
  }
`;

const Edit = () => {
    const [nickname, setNickname] = useState();
    const [email, setEmail] = useState();
    const [img, setImg] = useState();

    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const [usimInfo, setUsimInfo] = useState([] as any);
    const [postImages, setPostImages] = useState([] as any);

    React.useEffect(function () {
        axios({
            url: `/user`,
            method: 'get',
            withCredentials: true,
        })
            .then(function (result: any) {
                setNickname(result.data.nickname);
                setEmail(result.data.email);
                setImg(result.data.profileImg);
            })
            .catch(function (error: any) {
                console.error('user 에러발생: ', error);
            });
    }, []);

    const openUsimForm = () => {
        axios({
            method: 'get',
            url: `/friend/updateImages`,
            withCredentials: true,
        })
            .then(function (response) {
                console.log(response.data);

                setUsimInfo(response.data);
                setOpen((open) => !open);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const submitImg = () => {
        const formData = new FormData();

        formData.append('imgs', postImages[0]);
        formData.append('imgs', postImages[1]);
        formData.append('imgs', postImages[2]);
        // console.log('😉', usimInfo[0].img_id);

        axios({
            method: 'put',
            url: `/friend/updateImages`,
            withCredentials: true,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setTimeout(() => {
            history.go(0);
        }, 500);
    };

    const editOn = () => {
        setOpen((open) => !open);
    };

    const onDrop = (picture: any) => {
        setPostImages(picture);
        console.log(picture);
    };

    const renderUsimInfo = (): JSX.Element[] => {
        return usimInfo.map((id: any) => (
            <div key={id.img_id} style={{ margin: '10px' }}>
                <CardBox style={{ height: '280px' }}>
                    <Profile2 src={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${id.userImgUrl}`} alt="profile image" />
                </CardBox>
            </div>
        ));
    };

    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm" sx={{ pt: 5 }}>
                <CardBox>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ display: 'flex' }}>
                            <Grid xs={12}>{img ? <Profile src={img}></Profile> : <Profile src="./imgs/not_found_files.jpg"></Profile>}</Grid>
                            <Grid sx={{ marginRight: '7%' }}>
                                <Typography variant="h6" mt={4} color="#fff" style={{ textAlign: 'left' }}>
                                    {nickname}
                                </Typography>
                                <Typography variant="h6" mt={1} align="center" color="#fff">
                                    {email}
                                </Typography>

                                <Typography variant="h6" mt={1} color="#fff">
                                    내 얼굴 이미지 수정
                                    <CiEdit
                                        size="25"
                                        onClick={openUsimForm}
                                        style={{ color: '#fff', cursor: 'pointer', marginLeft: '10px', marginRight: '40px' }}
                                    />
                                </Typography>
                                <Modal open={open} onClose={handleClose}>
                                    <>
                                        <Box sx={Style}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    // border: 'solid blue',
                                                }}
                                            >
                                                {open && renderUsimInfo()}
                                            </div>
                                            <ImageUploader
                                                // style={{ maxHeight: '800px', maxWidth: '800px', innerHeight: '1000px', innerWidth: '1000px' }}
                                                withPreview={true}
                                                withIcon={false}
                                                onChange={onDrop}
                                                label="학습할 3개의 새로운 이미지를 첨부해주세요."
                                                imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                                                maxFileSize={5242880}
                                                buttonText="사진 업로드하기"
                                                // withLabel={true}
                                            />
                                            <div style={{ textAlign: 'center' }}>
                                                <Button sx={{ backgroundColor: '#6666CC', marginRight: '10px' }} variant="contained" onClick={editOn}>
                                                    취소
                                                </Button>
                                                {postImages.length === 3 ? (
                                                    <Button sx={{ backgroundColor: '#6666CC' }} variant="contained" onClick={submitImg}>
                                                        확인
                                                    </Button>
                                                ) : (
                                                    <Button disabled sx={{ backgroundColor: '#6666CC' }} variant="contained">
                                                        확인
                                                    </Button>
                                                )}
                                            </div>
                                        </Box>
                                    </>
                                </Modal>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardBox>
            </Container>
        </React.Fragment>
    );
};

export default Edit;
