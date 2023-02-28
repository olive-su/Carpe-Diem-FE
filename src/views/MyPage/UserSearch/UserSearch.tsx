import React, { useState, useRef } from 'react';
import { Paper } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { friendData } from '../../../types/type';
import { Button } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material';
import config from '../../../config';
import { List } from '@mui/material';

export function UserSearch() {
    const [searchedFriend, setSearchedFriend] = useState<friendData>();
    const [users, setUsers] = useState([]);
    const text = useRef<HTMLInputElement>(null);

    React.useEffect(function () {
        axios({
            method: 'get',
            url: `http://${config.server.host}:${config.server.port}/user/all`,
            withCredentials: true,
        })
            .then(function (result) {
                console.log(result.data);
                setUsers(result.data);
            })
            .catch(function (error) {
                console.error('allUser 에러발생: ', error);
            });
    }, []);
    const onsend = () => {
        if (text.current) {
            axios({
                method: 'post',
                url: `http://${config.server.host}:${config.server.port}/friend/`,
                data: {
                    receive_email: text.current.value,
                    check: 0,
                },
                withCredentials: true,
            })
                .then(function (result) {
                    console.log('요청 보내기 성공');
                    history.go(0);
                })
                .catch(function (error) {
                    console.error('요청보내기 에러발생: ', error);
                    alert('사용자를 찾지 못했습니다. 정확한 이메일을 입력해주세요.');
                });
        }
    };
    return (
        <>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto', mt: 2 }}>
                {/* <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search User"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e) => setValue(e.target.value)}
    /> */}
                <Autocomplete
                    freeSolo
                    sx={{ ml: 1, flex: 1 }}
                    id="free-solo-2-demo"
                    disableClearable
                    options={users?.map((option: friendData) => option.email)}
                    renderInput={(params: any) => (
                        <TextField
                            inputRef={text}
                            {...params}
                            label="search user"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
                {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={users?.map((option) => option.email)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
    />
    {/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={(e) => onsearch(value)}>
        <SearchIcon />
    </IconButton> */}
                <Button
                    sx={{ marginLeft: '15px', backgroundColor: '#1e319d', color: 'white' }}
                    onClick={() => {
                        onsend();
                    }}
                    size="large"
                    variant="contained"
                >
                    친구 요청
                </Button>
            </Paper>
            {searchedFriend ? (
                <ListItem alignItems="flex-start" sx={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemAvatar>
                        <Avatar alt="nickname" src="./imgs/not_found_files.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={searchedFriend.nickname}
                        secondary={
                            <React.Fragment>
                                <Typography sx={{ display: 'inline', color: '#cbd5e1' }} component="span" variant="body2" color="text.primary">
                                    {searchedFriend.email}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <Button sx={{ marginLeft: '15px', backgroundColor: '#1e319d', color: 'white' }} size="large" variant="contained">
                        친구 추가
                    </Button>
                </ListItem>
            ) : (
                []
            )}
        </>
    );
}
