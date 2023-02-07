

import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainList, secondList } from './listItems';

import WebCamPage from '../webCam/index';

import { Avatar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import MenuUnstyled, { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import MenuItemUnstyled, { menuItemUnstyledClasses } from '@mui/base/MenuItemUnstyled';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import Stack from '@mui/material/Stack';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { deepPurple, white, grey, blue } from '@mui/material/colors';

import Footer from './Footer/Footer';

const theme = createTheme({
    palette: {
        sky: {
            main: '#9edada',
        },
        purple: {
            main: '#6666cc',
        },
        point: {
            main: '#ff3399',
        },
        lightPuple: {
            main: '9999cc',
        },
        blue: {
            main: '#3366cc',
        },
        mint: {
            main: '#00dab0',
        },
        darkPuple: {
            main: '#797395',
        },
        black: {
            main: '#00000',
        },
    },
});


const drawerWidth = 180;

// 상단 바
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    // zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// 사이드바
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function Views() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [opens, setOpens] = React.useState(false);
    const handleClick = () => {
        setOpens((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpens(false);
    };

    const StyledMenuItem = styled(MenuItemUnstyled)(
        ({ theme }) => `
        list-style: none;
        padding: 8px;
        border-radius: 8px;
        cursor: default;
        user-select: none;
    
        &:last-of-type {
            border-bottom: none;
        }
    
        &.${menuItemUnstyledClasses.focusVisible} {
            outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
            background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
            color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        }
        
        &.${menuItemUnstyledClasses.disabled} {
            color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
        }
    
        &:hover:not(.${menuItemUnstyledClasses.disabled}) {
            background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
            color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        }
        `,
    );
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert ref={ref} {...props} />;
    });

    const styles = {
        position: 'absolute',
        top: 28,
        right: 0,
        left: 0,
        // zIndex: 1,
        border: '1px solid',
        p: 1,
        bgcolor: 'background.paper',
    };
    const createHandleMenuClick = (menuItem) => {
        return () => {
            console.log(`Clicked on ${menuItem}`);
            close();
        };
    };
    const StyledListbox = styled('ul')(
        ({ theme }) => `
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        padding: 6px;
        margin: 12px 0;
        min-width: 200px;
        border-radius: 12px;
        overflow: auto;
        outline: 0px;
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
        `,
    );

    const Popper = styled(PopperUnstyled)`
        z-index: 1;
    `;

    return (
        <>
            <ThemeProvider theme={mdTheme}>
                {/* 전체 큰 페이지 */}
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    {/* 헤더부분(반쪽 나뉘는 부분임!! */}
                    <AppBar position="absolute" open={open} sx={{ backgroundColor: 'white' }}>
                        <Toolbar
                            sx={{
                                pr: '24px', // keep right padding when drawer closed */}
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="black"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                <img src="imgs/logotitle.png" width={180} style={{ margin: 'auto', display: 'block' }} />
                            </Typography>
                            <Box>
                                <Typography sx={{ marginRight: 2, color: "black" }}>김김김 님</Typography>
                                <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: 1 }}>
                                    <Link fontSize="small" underline="hover" color="black" href="/material-ui/getting-started/installation/">
                                        로그아웃
                                    </Link>
                                </Breadcrumbs>
                            </Box>

                            <IconButton color="inherit">
                                <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Badge badgeContent={4} color="primary">
                                            <Avatar color="6666cc" onClick={handleClick}>
                                                OP
                                            </Avatar>
                                        </Badge>
                                        <MenuUnstyled open={opens} slots={{ root: Popper, listbox: StyledListbox }} sx={{ width: 300, marginTop: '60px', marginLeft: 1100 }}>
                                            <StyledMenuItem onClick={createHandleMenuClick('Profile')}>내 정보 수정</StyledMenuItem>
                                            <StyledMenuItem onClick={createHandleMenuClick('My account')}>마이페이지</StyledMenuItem>
                                            <Divider />
                                            <MenuItemUnstyled>
                                                <Stack spacing={2} sx={{ width: '100%' }}>
                                                    <Typography component="div" variant="div" color="inherit" align="left" noWrap sx={{ flex: 1 }}>
                                                        <NotificationsIcon />
                                                        알림
                                                    </Typography>
                                                    <Alert>앨범이 도착했습니다!</Alert>
                                                    <Alert>앨범이 도착했습니다!!</Alert>
                                                    <Alert>앨범이 도착했습니다!</Alert>
                                                </Stack>
                                            </MenuItemUnstyled>
                                        </MenuUnstyled>
                                    </Box>
                                </ClickAwayListener>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        {/* 사이드바 헤더 */}
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                                height: 75,
                            }}

                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            {mainList}
                            <Divider sx={{ my: 1, color: 'black' }} />
                            {secondList}
                        </List>
                    </Drawer>
                    <Box>
                        <Toolbar />
                        <Container sx={{ mt: 4, mb: 4, backgroundColor: 'white', }} >
                            <WebCamPage />

                        </Container>
                    </Box>
                </Box>
            </ThemeProvider >

            <Footer />

        </>
    );
}

export default function Dashboard() {
    return (
        <>
            <Views />
        </>
    )

}
