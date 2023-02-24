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
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Profile src="./imgs/not_found_files.jpg"></Profile>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" align="center">
                                닉네임
                            </Typography>
                            <Typography noWrap={true} variant="h6" mt={2} align="center" color="#64748b">
                                {nickname}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" align="center">
                                이메일
                            </Typography>
                            <Typography noWrap={true} variant="h6" mt={2} align="center" color="#64748b">
                                {email}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </React.Fragment>
    );
};

export default Edit;
