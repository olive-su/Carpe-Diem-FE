import React, { useEffect, useState } from 'react';
import FriendItem from './Friend/FriendItem';
import List from '@mui/material/List';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import Button from '@mui/material-next/Button';
import { Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { friendData } from '../../types/type';
import config from '../../config';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import { req } from '../../types/type';
import { UserSearch } from './UserSearch/UserSearch';

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
            <Container component="main" maxWidth="sm">
                <Paper elevation={0} sx={{ my: { xs: 3 }, p: { xs: 2}, color: '#1e319d' }}>
                    <Typography component="h1" variant="h5" align="left" >
                        보낸 친구 요청
                    </Typography>
                    <UserSearch />
                    <List sx={{overflow: 'auto', height: '320px', mt: 2}}>
                        {reqList?.map((item: friendData) => (
                            <ListItem key={item.user_id} alignItems="flex-start" sx={{ display: 'flex', alignItems: 'center' }}>
                                <FriendItem nickname={item.nickname} email={item.email} img={item.profile_img} />
                                <div style={{color: '#65a30d' }}>대기중</div>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Container>
        </React.Fragment>
    );
};

export default Send;
