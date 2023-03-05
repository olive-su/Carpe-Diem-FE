/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ALBUM_LIST_LOADING_REQUEST } from '../../redux/types';
import { NavLink } from 'react-router-dom';
import config from '../../config';
import { Typography } from '@mui/material';
import Book from './Book';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { albumData } from '../../types/type';

const Library = () => {
    const [offset, setOffset] = useState(0);
    const dispatch = useDispatch();
    const { albumList } = useSelector((state: any) => state.albumList);

    useEffect(() => {
        dispatch({
            type: ALBUM_LIST_LOADING_REQUEST,
            payload: offset,
        });
    }, [dispatch, offset]);

    useEffect(() => {
        const handleScroll = (e: any) => {
            const scrollHeight = e.target.documentElement.scrollHeight;
            const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;

            if (currentHeight + 1 >= scrollHeight) {
                setOffset(offset + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [offset]);

    return (
        <>
            <Container sx={{ width: '1200px', py: 2 }}>
                <Typography
                    sx={{
                        fontSize: '40px',
                        fontWeight: 'bold',
                        p: '4px 0px',
                        mt: '20px',
                        mb: '20px',
                        color: 'var(--white)',
                    }}
                >
                    앨범
                </Typography>
                <Grid container spacing={1}>
                    {albumList?.map((data: albumData, idx: any) => (
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
                                <NavLink to={`/album/${data.albumId}`}>
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

export default Library;
