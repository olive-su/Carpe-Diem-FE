import React, { useEffect } from 'react';
import styled from 'styled-components';
import { IconButton, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Menu, Snackbar } from '@mui/material';
import { Close, Facebook, Forum, Link, Share as ShareIcon, Twitter } from '@mui/icons-material';
import config from '../../config';

export interface SnackbarMessage {
    message: string;
    key: number;
}

export interface State {
    open: boolean;
    snackPack: readonly SnackbarMessage[];
    messageInfo?: SnackbarMessage;
}

const TextArea = styled.textarea`
    position: absolute;
    width: 0px;
    height: 0px;
    bottom: 0;
    left: 0;
    opacity: 0;
`;
const Share = (props: any) => {
    useEffect((): any => {
        const script = document.createElement('script');
        script.src = 'http://developers.kakao.com/sdk/js/kakao.js';
        script.async = true;

        document.body.appendChild(script);
        console.log(process.env.REACT_APP_BASIC_KAKAO);
        window.Kakao.init(`${process.env.REACT_APP_BASIC_KAKAO}`);
        console.log(window.Kakao.isInitialized());
        return (): HTMLScriptElement => document.body.removeChild(script);
    }, []);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [toast, setToast] = React.useState(false);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toastOpen = () => {
        setToast(true);
    };
    const toastClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setToast(false);
    };

    const copyUrlRef = React.useRef<HTMLTextAreaElement>(null);

    const copyUrl = (e: any) => {
        if (!document.queryCommandSupported('copy')) {
            return alert('복사 기능이 지원되지 않는 브라우저입니다.');
        }
        if (copyUrlRef.current) {
            copyUrlRef.current.select();
        }
        document.execCommand('copy');
        e.target.focus();

        setTimeout(() => {
            toastOpen();
        }, 200);
    };
    const url = encodeURI(window.location.href);

    // Facebook
    const shareFacebook = () => {
        window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
    };

    // Twitter
    const shareTwitter = () => {
        const text = '';
        window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url);
    };

    // Kakaotalk
    const shareKakaotalk = () => {
        if (window.Kakao) {
            const kakao = window.Kakao;
            kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: '내 추억 구경할래?',
                    description: props.comment,
                    imageUrl: `https://${config.aws.cdn_name}/${props.img}`,
                    link: {
                        mobileWebUrl: url,
                        webUrl: url,
                    },
                },
                buttons: [
                    {
                        title: '디지털 앨범 만들러 가기',
                        link: {
                            webUrl: url,
                            mobileWebUrl: url,
                        },
                    },
                ],
            });
        }
    };

    return (
        <div>
            <IconButton type="button" onClick={handleClick}>
                <ShareIcon sx={{ color: 'white' }} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            공유
                        </ListSubheader>
                    }
                >
                    <form>
                        <TextArea ref={copyUrlRef} value={window.location.href} />
                    </form>
                    <ListItemButton onClick={copyUrl}>
                        <ListItemIcon>
                            <Link />
                        </ListItemIcon>
                        <ListItemText primary="링크 복사" />
                    </ListItemButton>
                    <ListItemButton onClick={shareKakaotalk}>
                        <ListItemIcon>
                            <Forum sx={{ color: '#fcd34d' }} />
                        </ListItemIcon>
                        <ListItemText primary="카카오톡 공유" />
                    </ListItemButton>
                    <ListItemButton onClick={shareFacebook}>
                        <ListItemIcon>
                            <Facebook sx={{ color: '#0369a1' }} />
                        </ListItemIcon>
                        <ListItemText primary="페이스북 공유" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon onClick={shareTwitter}>
                            <Twitter sx={{ color: '#0ea5e9' }} />
                        </ListItemIcon>
                        <ListItemText primary="트위터 공유" />
                    </ListItemButton>
                </List>
            </Menu>
            <Snackbar
                open={toast}
                onClose={toastClose}
                message={'복사되었습니다.'}
                action={
                    <React.Fragment>
                        <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={toastClose}>
                            <Close />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
};
export default Share;
