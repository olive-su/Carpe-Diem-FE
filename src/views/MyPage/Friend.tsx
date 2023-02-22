import React from 'react';
import FriendItem from './FriendItem';
import List from '@mui/material/List';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import Button from '@mui/material-next/Button';
import { Paper } from '@mui/material';
const friend = [
    { id: '2312314', image: './imgs/not_found_files.jpg', nickname: '수개미', email: 'test@gamil.com' },
    { id: '2312314', image: './imgs/not_found_files.jpg', nickname: '수개미', email: 'test@gamil.com' },
];
const Friend = () => {
    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
                <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, color: '#1e319d' }}>
                    <Typography component="h1" variant="h4" align="left">
                        친구 목록
                        <Button sx={{ marginLeft: '15px', backgroundColor: '#1e319d', color: 'white' }} size="large" variant="filled">
                            친구 추가
                        </Button>
                    </Typography>
                    <List>
                        {friend.map((item) => (
                            <FriendItem key={item.id} item={item} />
                        ))}
                    </List>
                </Paper>
            </Container>
        </React.Fragment>
    );
};

export default Friend;
