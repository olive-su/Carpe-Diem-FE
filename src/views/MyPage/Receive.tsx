import React, { useEffect, useState } from 'react';
import FriendItem from './Friend/FriendItem';
import List from '@mui/material/List';
import { Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { friendData } from '../../types/type';
import config from '../../config';
import ListItem from '@mui/material/ListItem';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

const CardBox = styled.div`
    background-position: center;
    background-size: cover;
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
    text-align: center;
    border-radius: 1rem;
    padding: 1rem;
`;

const Receive = () => {
    const [friendList, setFriendList] = useState([]);

    React.useEffect(function () {
        axios({
            method: 'get',
            url: `http://${config.server.host}:${config.server.port}/friend/receive`,
            withCredentials: true,
        })
            .then(function (result) {
                setFriendList(result.data);
            })
            .catch(function (error) {
                console.error('friend 에러발생: ', error);
            });
    }, []);
    const accept = (friendEmail: string) => {
        axios({
            method: 'put',
            url: `http://${config.server.host}:${config.server.port}/friend/request/${friendEmail}/1`,
            withCredentials: true,
        })
            .then(function (result) {
                console.log('수락 성공!');
                history.go(0);
            })
            .catch(function (error) {
                console.error('accept 에러발생: ', error);
            });
    };
    const refuse = (friendEmail: string) => {
        axios({
            method: 'put',
            url: `http://${config.server.host}:${config.server.port}/friend/request/${friendEmail}/2`,
            withCredentials: true,
        })
            .then(function (result) {
                console.log('거절 성공!');
                history.go(0);
            })
            .catch(function (error) {
                console.error('refuse 에러발생: ', error);
            });
    };

    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <CardBox>
                    <h4 style={{ color: '#fff' }}>받은 친구 요청</h4>

                    <CardBox>
                        <List sx={{ overflow: 'auto', height: '282px' }}>
                            {friendList?.map((item: friendData) => (
                                <div key={item.user_id}>
                                    <ListItem alignItems="flex-start" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <FriendItem nickname={item.nickname} email={item.email} img={item.profile_img} />
                                        <IconButton sx={{ color: '#1e319d' }} component="label" onClick={(e) => accept(item.email)}>
                                            <DoneIcon />
                                        </IconButton>
                                        <IconButton onClick={(e) => refuse(item.email)} sx={{ color: '#b91c1c' }} component="label">
                                            <CloseIcon />
                                        </IconButton>
                                    </ListItem>
                                    <hr></hr>
                                </div>
                            ))}
                        </List>
                    </CardBox>
                </CardBox>
            </Container>
        </React.Fragment>
    );
};

export default Receive;
