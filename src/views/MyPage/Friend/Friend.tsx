import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import axios from 'axios';
import { friendData } from '../../../types/type';
import config from '../../../config';
import { Paper } from '@mui/material';
import styled from 'styled-components';
import './Friend.css';
import { BsPersonDash } from 'react-icons/bs';
import { BiLibrary } from 'react-icons/bi';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';

const TodoItemBlock = styled.div`
    &:hover {
        ${'#button'} {
            display: initial;
        }
    }
`;

const Friend = () => {
    const navigate = useNavigate();
    const [friendList, setFriendList] = useState([]);
    // const [search, setSearch] = useState<string>('');
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

    const onLibrary = (friendEmail: string) => {
        console.log(friendEmail);
        axios({
            method: 'get',
            url: `http://${config.server.host}:${config.server.port}/friend/${friendEmail}`,
            withCredentials: true,
        })
            .then(function (response: any) {
                const friendUserId = response.data[0].userId;
                navigate(`/friendAlbum/${friendUserId}`);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    };

    const onDel = (friendEmail: string) => {
        console.log(friendEmail);
        axios({
            method: 'delete',
            url: `http://${config.server.host}:${config.server.port}/friend/${friendEmail}`,
            withCredentials: true,
        })
            .then(function (response: any) {
                console.log(response.status);
                history.go(0);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    };

    // const searchSpace = (event: any) => {
    //     const keyword = event.target.value;
    //     setFriendList(
    //         allFriendList?.filter((data: friendData) => {
    //             if (data.nickname.toLowerCase().includes(keyword.toLowerCase()) || data.email.toLowerCase().includes(keyword.toLowerCase())) {
    //                 return data;
    //             }
    //         }),
    //     );
    // };

    return (
        <Container component="main">
            {friendList.length !== 0 ? (
                <Paper sx={{ my: { xs: 3 }, p: { xs: 2 }, color: '#1e319d' }}>
                    <h3>친구 목록</h3>
                    {friendList.map((item: friendData) => (
                        <section key={item.user_id}>
                            <div className="box">
                                <div className="list">
                                    <div className="imgBx">
                                        {item.profile_img ? (
                                            <img src={item.profile_img} alt="noImg" />
                                        ) : (
                                            <img src="./imgs/not_found_files.jpg" alt="noImg" />
                                        )}
                                    </div>
                                    <div className="content">
                                        <h2 className="rank">
                                            <button className="library" onClick={(e) => onLibrary(item.email)}>
                                                <BiLibrary size="27" />
                                            </button>
                                            <button className="person">
                                                <BsPersonDash size="27" onClick={(e) => onDel(item.email)} />
                                            </button>
                                        </h2>
                                        <h4>{item.nickname}</h4>
                                        <p>{item.email}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </Paper>
            ) : (
                <div>없습니다.</div>
            )}
        </Container>
    );
};

export default Friend;
