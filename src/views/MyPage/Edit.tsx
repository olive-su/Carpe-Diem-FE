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

const Profile = styled.img`
    display: flex;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    margin-top: 10px;
`;
const Edit = () => {
    const [user, setUser] = useState({
        nickname: 'test',
        email: 'test@gamil.com',
        password: 'test1233',
    });
    const [nickname, setNickname] = useState(user.nickname);
    // const [pwd, setPwd] = useState(user.password);
    // const [pwd2, setPwd2] = useState('');
    const [email, setEmail] = useState('test@gmail.com');
    const [editable, setEditable] = useState(false);
    const userId = '111026319355272059757';
    React.useEffect(function () {
        axios({
            url: `http://${config.server.host}:${config.server.port}/user/${userId}`,
            method: 'get',
        })
            .then(function (result: any) {
                console.log(result.data);
                setUser(result.data);
                setNickname(result.data.nickname);
                // setPwd(result.data.password);
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
        // if (pwd2 === '') {
        //     alert('비밀번호 확인을 입력해주세요.');
        //     return;
        // }
        // if (pwd != pwd2) {
        //     alert('비밀번호 확인이 일치하지 않습니다.');
        //     return;
        // }
        axios
            .put(`http://${config.server.host}:${config.server.port}/user/${userId}`, {
                nickname: nickname,
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
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, color: '#1e319d' }}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h4" align="center">
                                프로필
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{display:'flex', justifyContent: 'center'}}>
                            <Profile src="./imgs/not_found_files.jpg"></Profile>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" align="center">닉네임</Typography>
                            {editable ? (
                                <Typography variant="h6" mt={2} align="center">
                                    <input type="text" value={nickname} onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown} />
                                    {/* <Button variant="contained">수정</Button> */}
                                </Typography>
                            ) : (
                                <Typography noWrap={true} variant="h6" mt={2} align="center" color="#64748b">
                                    {nickname}
                                    <IconButton size="small" onClick={() => editOn()}>
                                        <EditIcon />
                                    </IconButton>
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" align="center">
                                이메일
                            </Typography>
                            <Typography noWrap={true} variant="h6" mt={2} align="center" color="#64748b">
                                {email}
                            </Typography>
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
        </React.Fragment>
    );
};

export default Edit;
