import React from 'react';

import styled from 'styled-components';

import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { friendData } from '../../../types/type';
import axios from 'axios';
import config from '../../../config';
import { req } from '../../../types/type';

type itemProps = {
    nickname: string;
    email: string;
    img: string;
};
const Profile = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 100%;
`;

export default function FriendItem({ nickname, email, img }: itemProps) {
    return (
        <>
            {img ? (
                <ListItemAvatar>
                    <Avatar alt="nickname" src={img} />
                </ListItemAvatar>
            ) : (
                <ListItemAvatar>
                    <Avatar alt="nickname" src="./imgs/not_found_files.jpg" />
                </ListItemAvatar>
            )}
            <ListItemText
                primary={nickname}
                secondary={
                    <React.Fragment>
                        <Typography sx={{ display: 'inline', color: '#cbd5e1' }} component="span" variant="body2" color="text.primary">
                            {email}
                        </Typography>
                    </React.Fragment>
                }
            />
        </>
    );
}
