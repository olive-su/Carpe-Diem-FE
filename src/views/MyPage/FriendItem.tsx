import React from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';

import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Paper} from '@mui/material';

type item = { id: string; image: string; nickname: string; email: string };
type itemProps = {
    item: item;
};
const Profile = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 100%;
`;

export default function FriendItem({ item }: itemProps) {
    const { id, image, nickname, email } = item;
    return (
        <Paper sx={{ my: { xs: 1, md: 2 }, p: { xs: 1, md: 2 }, color: '#1e319d' }}>
            <ListItem alignItems="flex-start" sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemAvatar>
                    <Avatar alt="nickname" src="./imgs/not_found_files.jpg" />
                </ListItemAvatar>
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
                <Button sx={{ marginLeft: '15px', backgroundColor: '#1e319d', color: 'white' }} variant="contained" size="small">
                    친구 삭제
                </Button>
            </ListItem>
        </Paper>
    );
}
