import React, { useState, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { friendData } from '../../../types/type';
import { Button } from '@mui/material';
import config from '../../../config';
import styled from 'styled-components';
import { userInfo } from 'os';

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
                setUsers(result.data);
            })
            .catch(function (error) {
                console.error('allUser 에러발생: ', error);
            });
    }, []);

    const onsend = () => {
        let checkUser = false;
        users.map((user) => {
            if (user['email'] === text.current?.value) {
                checkUser = true;
                return checkUser;
            }
        });

        if (checkUser) {
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
                    window.location.reload();
                })
                .catch(function (error) {
                    console.error('요청보내기 에러발생: ', error);
                    alert('사용자를 찾지 못했습니다. 정확한 이메일을 입력해주세요.');
                });
        } else {
            console.error('요청보내기 에러발생: 불명확한 이메일');
            alert('사용자를 찾지 못했습니다. 정확한 이메일을 입력해주세요.');
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
