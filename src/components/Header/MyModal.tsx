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
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { addNoti, deleteNoti } from '../../redux/reducer/notiReducer';
import axios from 'axios';
import config from '../../config';

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

const MyModal = (notis: any) => {
    const [show, setShow] = useState(true);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const API_URL = `http://${config.server.host}:${config.server.port}`;
    const userId = 'test';
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const add = () => {
        notis.addNoti('dsdf');
    };
    function del(key: string) {
        console.log('삭제');
        notis.deleteNoti(key);
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
                <Divider sx={{ color: '#334155' }} />
                <Stack sx={{ width: '100%' }}>
                    {notis.notis.notiReducer?.map((noti: any) => (
                        <MenuItem
                            key={noti.createdAt}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderBottom: 1,
                                borderColor: '#9ca3af',
                                padding: 1,
                                color: '#7DB2B1',
                                backgroundColor: '#f1f5f9',
                            }}
                        >
                            <Typography sx={{ marginRight: 15 }}>{noti.text}</Typography>
                            <Typography ml={22}>{elapsedTime(noti.createdAt)}</Typography>
                        </MenuItem>
                    ))}
                </Stack>
            </Menu>
        </div>
    );
};

function mapStateToProps(state: any, ownProps: any) {
    return { notis: state };
}
function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        addNoti: (text: any) => dispatch(addNoti(text)),
        deleteNoti: (id: any) => dispatch(deleteNoti(id)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyModal);
