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


const request: req[] = [{ requestId: 2312314, sendEmail:'test@gamil.com', receiveEmail: 'test@gamil.com', check: 0 }];
const Send = () => {
    const [reqList, setReqList] = useState(request);
    // React.useEffect(function () {
    //     axios({
    //         method: 'get',
    //         url: `http://${config.server.host}:${config.server.port}/friend`,
    //         withCredentials: true,
    //     })
    //         .then(function (result) {
    //             setFriendList(result.data);
    //         })
    //         .catch(function (error) {
    //             console.error('friend 에러발생: ', error);
    //         });
    // }, []);
    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
                <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, color: '#1e319d' }}>
                    <Typography component="h1" variant="h4" align="left">
                        보낸 친구 요청
                    </Typography>
                    <List>
                        {reqList.map((item: req) => (
                            <ListItem key={item.requestId} alignItems="flex-start" sx={{ display: 'flex', alignItems: 'center' }}>
                                {/* <FriendItem nickname = {item.nickname} email={item.email} /> */}
                                <div style={{ marginLeft: '15px' }}>{}</div>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Container>
        </React.Fragment>
    );
};

export default Send;
