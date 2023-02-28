import React, { useEffect, useState } from 'react';
import FriendItem from './Friend/FriendItem';
import List from '@mui/material/List';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
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
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


//const friend: req = { userId: '2312314', nickname: '수개미', email: 'test@gamil.com' };
const Receive = () => {
    const [friendList, setFriendList] = useState([]);
    const [searchedFriend, setSearchedFriend] = useState<friendData>();
    React.useEffect(function () {
        axios({
            method: 'get',
            url: `http://${config.server.host}:${config.server.port}/friend/receive`,
            withCredentials: true,
        })
            .then(function (result) {
                setFriendList(result.data);
                //setSearchedFriend(friend);
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
                window.location.reload();
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
                window.location.reload();
            })
            .catch(function (error) {
                console.error('refuse 에러발생: ', error);
            });
    };

    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <Paper elevation={0} sx={{ my: { xs: 3 },p: { xs: 2}, color: '#1e319d' }}>
                    <Typography component="h1" variant="h5" align="left">
                        받은 친구요청
                    </Typography>
                    <List sx={{ overflow: 'auto', height: '320px' }}>
                        {friendList?.map((item: friendData) => (
                            <ListItem key={item.user_id} alignItems="flex-start" sx={{ display: 'flex', alignItems: 'center' }}>
                                <FriendItem nickname={item.nickname} email={item.email} img={item.profile_img} />
                                {/* <Button  sx={{ marginLeft: '15px', color: '#1e319d' }} size="small" variant="text">
                                    +
                                </Button> */}
                                <IconButton sx={{ color: '#1e319d' }} component="label" onClick={(e) => accept(item.email)}>
                                    <DoneIcon />
                                </IconButton>
                                {/* <Button onClick={(e) => refuse(item.email)} sx={{ marginLeft: '15px', color: '#b91c1c' }} size="small" variant="text">
                                    x
                                </Button> */}
                                <IconButton onClick={(e) => refuse(item.email)} sx={{ color: '#b91c1c' }} component="label">
                                    <CloseIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Container>
        </React.Fragment>
    );
};

export default Receive;
