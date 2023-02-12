import React from 'react';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { deepPurple, grey, blue } from '@mui/material/colors';
import { SxProps } from '@mui/system';
import MenuUnstyled, { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import MenuItemUnstyled, { menuItemUnstyledClasses } from '@mui/base/MenuItemUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import { Avatar, Badge, Box, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';

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

function Nav() {
    const [open, setOpen] = React.useState(false);
    const [isopen, setisOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!isopen);
    };

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
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
        return <MuiAlert ref={ref} sx={{ backgroundColor: '#9edada', color: 'black' }} {...props} />;
    });

    const styles = {
        position: 'absolute',
        top: 28,
        right: 0,
        left: 0,
        zIndex: 1,
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
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Button size="small" onClick={toggleDrawer}>
                        <MenuIcon sx={{ color: '#9999cc' }} fontSize="large" />
                    </Button>
                    <Typography component="h2" variant="h5" color="inherit" align="center" noWrap sx={{ flex: 1 }}>
                        <img src="imgs/logotitle.png" width={180} />
                    </Typography>
                    <Box>
                        <Typography sx={{ marginRight: 2 }}>김다솔 님</Typography>
                        <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: 1 }}>
                            <Link fontSize="small" underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
                                로그아웃
                            </Link>
                        </Breadcrumbs>
                    </Box>
                    <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
                        <Box sx={{ position: 'relative' }}>
                            <Badge badgeContent={4} color="primary">
                                <Avatar sx={{ backgroundColor: '#6666cc' }} onClick={handleClick}>
                                    OP
                                </Avatar>
                            </Badge>
                        </Box>
                    </ClickAwayListener>
                    <Box sx={{ display: 'flex', backgroundColor: 'blue', justifyContent: 'flex-end' }}>
                        <MenuUnstyled open={open} slots={{ root: Popper, listbox: StyledListbox }}>
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
                                    <Alert>앨범이 도착했습니다!</Alert>
                                    <Alert>앨범이 도착했습니다!</Alert>
                                </Stack>
                            </MenuItemUnstyled>
                        </MenuUnstyled>
                    </Box>
                </Toolbar>
                <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'space-between', overflowX: 'auto' }}></Toolbar>
            </ThemeProvider>
        </React.Fragment>
    );
}

Nav.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default Nav;
