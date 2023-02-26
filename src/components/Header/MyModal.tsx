import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsFillBellFill } from 'react-icons/bs';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ADD_NOTI, DELETE_NOTI } from '../../redux/types';

function elapsedTime(date: any) {
    const start: any = new Date(date);
    const end: any = new Date();

    const diff = (end - start) / 1000;

    const times = [
        { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
        { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
        { name: '일', milliSeconds: 60 * 60 * 24 },
        { name: '시간', milliSeconds: 60 * 60 },
        { name: '분', milliSeconds: 60 },
    ];

    for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);
        if (betweenTime > 0) {
            return `${betweenTime}${value.name} 전`;
        }
    }
    return '방금 전';
}

const MyModal = () => {
    const dispatch = useDispatch();
    const { notifications } = useSelector((state: any) => state.noti);

    console.log(notifications);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const add = () => {
        console.log('추가');
        dispatch({
            type: ADD_NOTI,
            message: '앨범이 도착했습니다.',
        });
    };
    function del(key: string) {
        console.log('삭제');
        dispatch({
            type: DELETE_NOTI,
            id: key,
        });
    }
    // useEffect(
    //     function () {
    //         axios({
    //             url: `${API_URL}/notification/${userId}`,
    //             method: 'get',
    //         }).then(function (result) {
    //             result.data.map((noti: any) => {
    //                 notis.addNoti(noti.createdAt);
    //             });
    //         });
    //     },
    //     [notis.notis.notiReducer],
    // );
    return (
        <div>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                style={{ marginRight: 20 }}
            >
                <BsFillBellFill style={{ color: '#7DB2B1', cursor: 'pointer' }} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                        width: 300,
                        height: 400,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem sx={{ color: '#9ca3af', marginLeft: 2 }}> Notifications</MenuItem>
                <button onClick={add}> 추가 </button>
                <Divider sx={{ color: '#334155' }} />
                <Stack sx={{ width: '100%' }}>
                    {notifications.map((noti: any) => (
                        <MenuItem
                            key={noti.id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderBottom: '1px solid #9ca3af',
                                padding: 1,
                                color: '#7DB2B1',
                                backgroundColor: '#f1f5f9',
                            }}
                            onClick={() => {
                                del(noti.id);
                            }}
                        >
                            <Typography sx={{ marginRight: 10 }}>{noti.message}</Typography>
                            <Typography ml={27}>{elapsedTime(noti.id)}</Typography>
                        </MenuItem>
                    ))}
                </Stack>
            </Menu>
        </div>
    );
};

export default MyModal;
