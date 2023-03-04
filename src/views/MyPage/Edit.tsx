import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { color, Container, display } from '@mui/system';
import axios from 'axios';
import config from '../../config';
import styled from 'styled-components';
import { CiEdit } from 'react-icons/ci';

const Profile = styled.img`
    display: flex;
    width: 150px;
    height: 150px;
    border-radius: 100%;
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

const Edit = () => {
    const [nickname, setNickname] = useState();
    const [email, setEmail] = useState();
    const [img, setImg] = useState();
    const [editable, setEditable] = useState(false);

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

    // const sendEdit = () => {
    //     if (nickname === '') {
    //         alert('닉네임을 입력해주세요.');
    //         return;
    //     }
    //     axios({
    //         method: 'put',
    //         url: `/user`,
    //         withCredentials: true,
    //         data: {
    //             nickname: nickname,
    //         },
    //     })
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log('ssssssss', error);
    //         });
    // };

    const editOn = () => {
        setEditable(true);
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
                                    <CiEdit size="25" onClick={editOn} style={{ color: '#fff', cursor: 'pointer', marginRight: '15px' }} />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardBox>
            </Container>
        </React.Fragment>
    );
};

export default Edit;
