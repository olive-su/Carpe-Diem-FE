import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { BiMenu, BiExit } from 'react-icons/bi';
import { FaGithub } from 'react-icons/fa';

export default function Header(props: any | undefined) {
    const { isAuthenticated, isLoading } = useSelector((state: any) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState('-100%');
    const logoColor = props.dark ? '-dark' : '-white';
    const themeColorDark = props.dark ? '#333' : '#fff';
    const themeColorWhite = props.dark ? '#fff' : '#333';

    const StyleHeader = styled.div`
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 40px 120px;
        z-index: 10000;
    `;

    const Logo = styled.img`
        position: relative;
        display: inline-flex;
        width: 7%;
        height: 7%;
        @media (max-width: 1024px) {
            width: 60px;
        }
    `;

    const RightSide = styled.div`
        display: flex;
        justify-content: center;
        gap: 20px;
    `;

    const GithubIcon = styled.a`
        text-decoration: none;
        color: ${themeColorDark};
        font-size: 1.5em;
        &:hover {
            text-decoration: none;
            color: #6666cc;
        }
    `;

    const MenuButton = styled.a`
        position: relative;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-left: 10px;
        color: ${themeColorDark};

        &:hover {
            text-decoration: none;
            color: #6666cc;
        }
    `;

    const List = styled.li`
        list-style: none;
    `;

    const Inner = styled.a`
        display: inline-flex;
        margin: 5px 0;
        font-size: 1.35em;
        text-decoration: none;
        color: ${themeColorDark};
        padding: 5px 20px;
        border-radius: 40px;

        &:hover {
            background: ${themeColorDark};
            color: ${themeColorWhite};
        }
    `;

    const fade = keyframes`
    0% {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
    to {
        opacity: 1;
        transform: translateZ(0);
    }
    `;

    const handleMenuToggle = () => {
        if (isMenuOpen === '-100%') {
            setIsMenuOpen('0');
        } else {
            setIsMenuOpen('-100%');
        }
    };

    const Sidebar = styled('div')`
        position: absolute;
        top: 0;
        left: ${isMenuOpen};
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: ${themeColorWhite};
        z-index: 4;
        animation: ${fade} 1s;
    `;

    return (
        <>
            <StyleHeader>
                <a href="/main">
                    <Logo src={`${process.env.PUBLIC_URL}/imgs/main-logo${logoColor}.png`}></Logo>
                </a>
                <RightSide>
                    {/* <VideoPlayer class="mobile" iconClass="mobile" label="Mobile Cam" videoSrc="video.mp4" /> */}

                    <GithubIcon href="https://github.com/cd-carpe-diem" rel="noreferrer noopener" target="_blank">
                        <FaGithub size="30" />
                    </GithubIcon>
                    {isAuthenticated && (
                        <MenuButton onClick={handleMenuToggle}>
                            {isMenuOpen === '0' ? <BiExit size="30" name="close-outline" /> : <BiMenu size="30" name="menu-outline" />}
                        </MenuButton>
                    )}
                </RightSide>
            </StyleHeader>
            <Sidebar>
                <List style={{ marginBottom: 30 }}>
                    <Inner href="/camera/mobile">Mobile Cam</Inner>
                    <Inner href="/camera/web">Web Cam</Inner>
                </List>
                <List>
                    <Inner href="/">Home</Inner>
                </List>
                <List>
                    <Inner href="/album">Album</Inner>
                </List>
                <List>
                    <Inner href="/video">Video</Inner>
                </List>
                <List>
                    <Inner href="#">Friend Album</Inner>
                </List>
                <List>
                    <Inner href="/mypage">My page</Inner>
                </List>
            </Sidebar>
        </>
    );
}
