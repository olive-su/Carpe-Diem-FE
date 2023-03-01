import React, { useEffect, useState } from 'react';
import FriendItem from './Friend/FriendItem';
import List from '@mui/material/List';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import axios from 'axios';
import { friendData } from '../../types/type';
import config from '../../config';
import ListItem from '@mui/material/ListItem';
import { UserSearch } from './UserSearch/UserSearch';
import styled from 'styled-components';

const CardBox = styled.div`
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
    text-align: center;
    border-radius: 1rem;
    padding: 1rem;
`;

const request: friendData[] = [{ nickname: '수개미', user_id: '2312314', email: 'test@gamil.com', profile_img: '' }];
const Send = () => {
    const [reqList, setReqList] = useState([]);
    React.useEffect(function () {
        axios({
            method: 'get',
            url: `http://${config.server.host}:${config.server.port}/friend/request`,
            withCredentials: true,
        })
            .then(function (result) {
                setReqList(result.data);
                console.log(result.data);
            })
            .catch(function (error) {
                console.error('friend req send 에러발생: ', error);
            });
    }, []);
    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 5 }}>
                <CardBox>
                    <h3 style={{ color: '#fff' }}>보낸 친구 요청</h3>

                    <UserSearch />

                    <div style={{ paddingTop: '1em' }}>
                        <CardBox style={{ overflow: 'auto', height: '200px' }}>
                            {reqList?.map((item: friendData) => (
                                <div key={item.user_id}>
                                    <ListItem alignItems="flex-start" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <FriendItem nickname={item.nickname} email={item.email} img={item.profile_img} />
                                        <div style={{ color: '#fff' }}>요청 수락 대기중</div>
                                    </ListItem>
                                    <hr></hr>
                                </div>
                            ))}
                        </CardBox>
                    </div>
                </CardBox>
            </Container>
        </React.Fragment>
    );
};

export default Send;
