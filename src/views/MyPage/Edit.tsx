import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Paper } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';
import config from '../../config';
import styled from 'styled-components';
import $ from 'jquery';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: "'IBMPlexSansKR-Regular'",
    },
});

const Profile = styled.img`
    position: absolute;
    left: 29%;
    top: 10%;
    transform: translateX(-50%);
    width: 200px;
    height: 200px;
    background: #333;
    border-radius: 20px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);
`;
const Edit = () => {
    const [nickname, setNickname] = useState();
    const [email, setEmail] = useState();
    const [editable, setEditable] = useState(false);

    React.useEffect(function () {
        axios({
            url: `http://${config.server.host}:${config.server.port}/user`,
            method: 'get',
            withCredentials: true,
        })
            .then(function (result: any) {
                setNickname(result.data.nickname);
                setEmail(result.data.email);
            })
            .catch(function (error: any) {
                console.error('user 에러발생: ', error);
            });
    }, []);

    const sendEdit = () => {
        if (nickname === '') {
            alert('닉네임을 입력해주세요.');
            return;
        }
        axios({
            method: 'put',
            url: `http://${config.server.host}:${config.server.port}/user`,
            withCredentials: true,
            data: {
                nickname: nickname,
            },
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log('ssssssss', error);
            });
    };
    // const [showPassword, setShowPassword] = React.useState(false);
    // const [showPassword2, setShowPassword2] = React.useState(false);

    // const handleClickShowPassword = () => setShowPassword((show) => !show);

    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };
    // const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    // const handleMouseDownPassword2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };
    const editOn = () => {
        setEditable(true);
    };
    const handleChange = (e: any) => {
        setNickname(e.target.value);
    };
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            setEditable(false);
            sendEdit();
        }
    };

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Container
                    style={{
                        fontFamily: 'IBMPlexSansKR-Regular',
                        width: '600px',
                        height: '1000px',
                        boxShadow: '0 35px 80px rgba(0, 0, 0, 0.15)',
                        transition: '0.5s',
                    }}
                    component="main"
                >
                    <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, color: '#1e319d', borderRadius: '20px' }}>
                        <Grid container spacing={20}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Profile src="./imgs/not_found_files.jpg"></Profile>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h4" align="center">
                                    My Profile
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ marginRight: '10px' }}>닉네임</Typography>
                                {editable ? (
                                    <Typography>
                                        <input type="text" value={nickname} onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown} />
                                        {/* <Button variant="contained">수정</Button> */}
                                    </Typography>
                                ) : (
                                    <span style={{ display: 'flex' }}>
                                        <Typography>{nickname}</Typography>
                                        <IconButton size="small" onClick={() => editOn()}>
                                            <EditIcon />
                                        </IconButton>
                                    </span>
                                )}
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ marginRight: '10px' }}>Email</Typography>
                                <Typography>{email}</Typography>
                            </Grid>
                            {/* <Grid item xs={12}>
                            <FormControl sx={{ width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="pwd">비밀번호</InputLabel>
                                <OutlinedInput
                                    sx={{ width: '100%' }}
                                    id="pwd"
                                    error={pwd === '' ? true : false}
                                    value={pwd}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPwd(event.target.value);
                                    }}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="비밀번호"
                                />
                                <FormHelperText style={{ color: '#d32f2f', display: pwd === '' ? 'block' : 'none' }}>
                                    비밀번호를 입력해주세요.
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="pwd2">비밀번호 확인</InputLabel>
                                <OutlinedInput
                                    sx={{ width: '100%' }}
                                    id="pwd2"
                                    error={pwd2 === '' || pwd2 !== pwd ? true : false}
                                    value={pwd2}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPwd2(event.target.value);
                                    }}
                                    type={showPassword2 ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword2}
                                                onMouseDown={handleMouseDownPassword2}
                                                edge="end"
                                            >
                                                {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="비밀번호 확인"
                                />
                                <FormHelperText style={{ color: '#d32f2f', display: pwd2 === '' || pwd2 !== pwd ? 'block' : 'none' }}>
                                    {pwd2 === '' ? '비밀번호 확인을 입력해주세요.' : '비밀번호와 일치하지 않습니다.'}
                                </FormHelperText>
                            </FormControl>
                        </Grid> */}
                            {/* <Grid item xs={12} style={{ display: 'flex', justifyContent: 'right' }}>
                            <Button onClick={sendEdit} sx={{ backgroundColor: '#1e319d', color: 'white' }}>
                                수정
                            </Button>
                        </Grid> */}
                        </Grid>
                    </Paper>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
};

export default Edit;
