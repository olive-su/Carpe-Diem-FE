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

//const friend: req = { userId: '2312314', nickname: '수개미', email: 'test@gamil.com' };
const Receive = () => {
    const [friendList, setFriendList] = useState([]);
    const [searchedFriend, setSearchedFriend] = useState<friendData>();
    React.useEffect(function () {
        axios({
            method: 'get',
            url: `http://${config.server.host}:${config.server.port}/friend`,
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
    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
                <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, color: '#1e319d' }}>
                    <Typography component="h1" variant="h6" align="left">
                        받은 친구요청
                    </Typography>
                    <List>
                        {friendList.map((item: friendData) => (
                            <ListItem key={item.userId} alignItems="flex-start" sx={{ display: 'flex', alignItems: 'center' }}>
                                {/* <FriendItem item={item} />
                                <Button
                                    onClick={(e) => ondel(item.email)}
                                    sx={{ marginLeft: '15px', backgroundColor: '#1e319d', color: 'white' }}
                                    size="small"
                                >
                                    추가
                                </Button>
                                <Button
                                    onClick={(e) => ondel(item.email)}
                                    sx={{ marginLeft: '15px', backgroundColor: '#b91c1c', color: 'white' }}
                                    size="small"
                                >
                                    거절
                                </Button> */}
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Container>
        </React.Fragment>
    );
};

export default Receive;
