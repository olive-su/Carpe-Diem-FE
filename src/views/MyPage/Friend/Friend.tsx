import React, { useEffect, useState, useRef } from 'react';
import FriendItem from './FriendItem';
import List from '@mui/material/List';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { friendData } from '../../../types/type';
import config from '../../../config';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import { Paper } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Receive from '../Receive';
import Send from '../Send';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import styled from 'styled-components';

const TodoItemBlock = styled.div`
    &:hover {
        ${'#button'} {
            display: initial;
        }
    }
`;

const friend: friendData = { user_id: '2312314', nickname: '수개미', email: 'test@gamil.com', profile_img: '' };
const Friend = () => {
    const [friendList, setFriendList] = useState([]);
    const [value, setValue] = useState('');
    const [search, setSearch] = useState<string>('');
    const [allFriendList, setAllFriendList] = useState([]);
    React.useEffect(function () {
        axios({
            method: 'get',
            url: `http://${config.server.host}:${config.server.port}/friend/`,
            withCredentials: true,
        })
            .then(function (result) {
                console.log(result.data);
                setFriendList(result.data);
                setAllFriendList(result.data);
            })
            .catch(function (error) {
                console.error('friend 에러발생: ', error);
            });
    }, []);

    const ondel = (friendEmail: string) => {
        console.log(friendEmail);
        axios({
            method: 'delete',
            url: `http://${config.server.host}:${config.server.port}/friend/${friendEmail}`,
            withCredentials: true,
        })
            .then(function (response: any) {
                console.log(response.status);
                window.location.reload();
            })
            .catch(function (error: any) {
                console.log(error);
            });
    };

    const searchSpace = (event: any) => {
        const keyword = event.target.value;
        setFriendList(
            allFriendList?.filter((data: friendData) => {
                if (data.nickname.toLowerCase().includes(keyword.toLowerCase()) || data.email.toLowerCase().includes(keyword.toLowerCase())) {
                    return data;
                }
            }),
        );
    };
    return (
        <React.Fragment>
            <Container maxWidth="sm" component="main">
                <Paper elevation={0} sx={{ my: { xs: 3 }, p: { xs: 2 }, color: '#1e319d' }}>
                    <Typography component="h1" variant="h5" align="left">
                        친구 목록
                    </Typography>
                    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto', mt: 2 }}>
                        <TextField
                            id="outlined-search"
                            label="Search friend"
                            type="search"
                            sx={{ ml: 1, flex: 1 }}
                            onChange={(e) => searchSpace(e)}
                        />
                    </Paper>
                    {friendList.length !== 0 ? (
                        <Paper sx={{ my: { xs: 3 }, p: { xs: 2 }, color: '#1e319d' }}>
                            <List sx={{ overflow: 'auto', height: '600px' }}>
                                {friendList.map((item: friendData) => (
                                    <TodoItemBlock key={item.user_id}>
                                        <ListItem  alignItems="flex-start" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <FriendItem nickname={item.nickname} email={item.email} img={item.profile_img} />
                                            {/* <Button
                                            onClick={(e) => ondel(item.email)}
                                            sx={{ backgroundColor: '#1e319d', color: 'white' }}
                                            size="small"
                                            variant="contained"
                                        >
                                            삭제
                                        </Button> */}
                                            <IconButton
                                                id="button"
                                                onClick={(e) => ondel(item.email)}
                                                sx={{ color: '#b91c1c', display: 'none' }}
                                                component="label"
                                            >
                                                <PersonRemoveIcon />
                                            </IconButton>
                                        </ListItem>
                                    </TodoItemBlock>
                                ))}
                            </List>
                        </Paper>
                    ) : (
                        <div>없습니다.</div>
                    )}
                </Paper>
            </Container>
        </React.Fragment>
    );
};

export default Friend;
