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
import { Typography } from '@mui/material';
import { albumData } from '../../types/type';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

interface friendInfo {
    backgroundCheck: any;
    createdAt: any;

    email: any;
    nickname: any;
    profileImg: any;

    updatedAt: any;
    userId: any;
}
interface friendAlbumInfo {
    friendInfo: friendInfo;
    result: any[];
}

const FriendLibrary = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const [friendAlbumList, setFriendAlbumList] = useState<friendAlbumInfo>();

    console.log(friendAlbumList);
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
            <Container sx={{ width: '1200px', py: 2 }}>
                <Typography sx={{ fontSize: '40px', fontWeight: 'bold', p: '4px 0px', mt: '20px', mb: '20px', color: 'var(--white)' }}>
                    <div style={{ display: 'flex' }}>
                        <ListItemAvatar>
                            <Avatar
                                alt="nickname"
                                src={friendAlbumList?.friendInfo.profileImg}
                                sx={{ width: '60px', height: '60px', marginRight: '20px' }}
                            />
                        </ListItemAvatar>
                        {friendAlbumList?.friendInfo.nickname}님의 앨범
                    </div>
                </Typography>
                <Grid container>
                    {friendAlbumList &&
                        friendAlbumList.result?.map((data: albumData, idx: any) => (
                            <Grid item xs={12} sm={4}>
                                <Card
                                    sx={{
                                        boxShadow: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        borderRadius: '0px',
                                        backgroundColor: '#6666cc',
                                        padding: '10px',
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
