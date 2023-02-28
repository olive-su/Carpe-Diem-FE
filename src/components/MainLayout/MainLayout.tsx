import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Collapse } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import {
    RadioButtonCheckedRounded,
    CollectionsRounded,
    PhotoRounded,
    PeopleAltRounded,
    Menu,
    ChevronLeft,
    ChevronRight,
    ExpandLess,
    ExpandMore,
    StarBorder,
} from '@mui/icons-material';

import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

declare interface sideBarItemType {
    menu: string;
    icon: any;
    path: string;
}

const drawerWidth = 240;

const sideBarItems: sideBarItemType[] = [
    { menu: '새 카드 만들기', icon: <RadioButtonCheckedRounded />, path: '/' },
    { menu: '카드 목록', icon: <PhotoRounded />, path: '/video' },
    { menu: '내 서재', icon: <CollectionsRounded />, path: '/album' },
];

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export default function MainLayout(props: any) {
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [listOpen, setListOpen] = React.useState(true);

    const handleClick = () => {
        setListOpen(!listOpen);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            // marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <Menu />
                    </IconButton>
                    <IconButton
                        onClick={handleDrawerClose}
                        sx={{
                            // marginRight: 5,
                            ...(!open && { display: 'none' }),
                        }}
                    >
                        {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {sideBarItems.map((item) => (
                        <ListItem key={item.menu} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => {
                                    navigate(`${item.path}`);
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.menu} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItemButton
                        onClick={handleClick}
                        sx={{
                            minHeight: 48,
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon>
                            <PeopleAltRounded />
                        </ListItemIcon>
                        <ListItemText primary="친구 앨범" sx={{ opacity: open ? 1 : 0 }} />
                        {listOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={listOpen} timeout="auto" unmountOnExit>
                        {/* TODO: 친구 목록 띄우기 */}
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <div style={{ display: 'flex', flexDirection: 'column', width: '1920px' }}>
                <Header />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {props.children}
                </Box>
                {/* <Footer /> */}
            </div>
        </div>
    );
}
