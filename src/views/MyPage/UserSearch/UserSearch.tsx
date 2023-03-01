import React, { useState, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { friendData } from '../../../types/type';
import { Button } from '@mui/material';
import config from '../../../config';
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
    display: flex;
`;

const InputTextField = styled(TextField)({
    '& label': {
        color: '#fff',
    },
    '& label.Mui-focused': {
        color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
        color: '#fff',
        '& fieldset': {
            borderColor: '#fff',
        },
    },
});

export function UserSearch() {
    const text = useRef<HTMLInputElement>(null);
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState();
    const [friends, setFriends] = useState([]);
    const [reqFriends, setReqFriends] = useState([]);

    React.useEffect(function () {
        axios({
            method: 'get',
            url: `http://${config.server.host}:${config.server.port}/friend/request`,
            withCredentials: true,
        })
            .then(function (result) {
                setReqFriends(result.data);
            })
            .catch(function (error) {
                console.error('friend req send 에러발생: ', error);
            });
    }, []);

    React.useEffect(function () {
        axios({
            method: 'get',
            url: `http://${config.server.host}:${config.server.port}/friend`,
            withCredentials: true,
        })
            .then(function (result: any) {
                setFriends(result.data);
            })
            .catch(function (error: any) {
                console.error('friend 에러발생: ', error);
            });
    }, []);

    React.useEffect(function () {
        axios({
            method: 'get',
            url: `http://${config.server.host}:${config.server.port}/user`,
            withCredentials: true,
        })
            .then(function (result: any) {
                setEmail(result.data.email);
            })
            .catch(function (error: any) {
                console.error('user 에러발생: ', error);
            });
    }, []);

    React.useEffect(function () {
        axios({
            method: 'get',
            url: `http://${config.server.host}:${config.server.port}/user/all`,
            withCredentials: true,
        })
            .then(function (result: any) {
                setUsers(result.data);
            })
            .catch(function (error: any) {
                console.error('allUser 에러발생: ', error);
            });
    }, []);

    const onsend = () => {
        // 친구 요청 이메일이 유저인지 확인
        let checkUser = false;
        // 친구 요청 이메일이 본인인지 확인
        let checkMe = false;
        // 이미 친구인지 확인
        let checkFriend = false;
        // 이미 보낸 요청인 경우
        let checkReqFriend = false;

        users.map((user) => {
            if (user['email'] === text.current?.value) {
                checkUser = true;
                return checkUser;
            }
        });

        if (checkUser && text.current?.value === email) {
            checkMe = true;
        }

        friends.map((friend) => {
            if (friend['email'] === text.current?.value) {
                checkFriend = true;
                return checkFriend;
            }
        });

        reqFriends.map((friend) => {
            if (friend['email'] === text.current?.value) {
                checkReqFriend = true;
                return checkReqFriend;
            }
        });

        if (checkUser && !checkMe && !checkFriend && !checkReqFriend) {
            axios({
                method: 'post',
                url: `http://${config.server.host}:${config.server.port}/friend/`,
                data: {
                    receive_email: text.current?.value,
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
                    alert('요청을 보낼 수 없습니다. 정확한 이메일을 입력해주세요.');
                });
        } else {
            if (!checkUser) alert('서비스 사용자가 아닌 경우 친구 요청을 보낼 수 없습니다. 정확한 이메일을 입력해주세요.');
            else if (checkMe) alert('본인에게는 친구 요청을 보낼 수 없습니다.');
            else if (checkFriend) alert('이미 친구인 사용자에게는 친구 요청을 보낼 수 없습니다.');
            else if (checkReqFriend) alert('이미 요청을 보낸 사용자입니다.');
        }
    };
    return (
        <CardBox>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                sx={{ width: '65%' }}
                options={users?.map((option: friendData) => option.email)}
                renderInput={(params: any) => (
                    <InputTextField
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
            <Button
                sx={{ marginLeft: '10px', background: '#6666cc', color: 'white', width: '35%' }}
                onClick={() => {
                    onsend();
                }}
                variant="contained"
            >
                친구 요청 보내기
            </Button>
        </CardBox>
    );
}
