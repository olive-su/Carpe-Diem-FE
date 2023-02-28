/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FRIEND_ALBUM_LIST_LOADING_REQUEST } from '../../redux/types';
import { NavLink } from 'react-router-dom';
import config from '../../config';
import Book from './Book';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { albumData } from '../../types/type';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FriendLibrary = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const [friendAlbumList, setFriendAlbumList] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://${config.server.host}:${config.server.port}/friendAlbum/${userId}`,
            withCredentials: true,
        })
            .then(function (result) {
                setFriendAlbumList(result.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}> Album</h1>
            <Container sx={{ width: '1200px', py: 2 }}>
                <Grid container spacing={1}>
                    {friendAlbumList?.map((data: albumData, idx: any) => (
                        <Grid item xs={12} sm={4}>
                            <Card
                                sx={{
                                    boxShadow: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    borderRadius: '0px',
                                    backgroundColor: 'transparent',
                                }}
                            >
                                <NavLink to={`/friendAlbum/${data.userId}/${data.albumId}`}>
                                    <Book album={data} />
                                </NavLink>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default FriendLibrary;
