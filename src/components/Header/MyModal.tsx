import React, { useState } from 'react';
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
import { addNoti, deleteNoti } from '../../reducer/notiReducer';

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
    const [show, setShow] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const add = () => {
        notis.addNoti('dsdf');
    };
    return (
        <div>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
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
                <button onClick={add}>추가</button>
                <Divider sx={{ color: '#334155' }} />
                <Stack sx={{ width: '100%' }}>
                    {notis.notis.notiReducer.map((noti: any) => (
                        <MenuItem
                            key={noti.createdAt}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderBottom: 1,
                                borderColor: '#9ca3af',
                                padding: 1,
                                color: '#7DB2B1',
                                backgroundColor: '#f1f5f9',
                            }}
                        >
                            <Typography sx={{ marginRight: 20 }}>{noti.text}</Typography>
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
        deletNoti: (id: any) => dispatch(deleteNoti(id)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyModal);
