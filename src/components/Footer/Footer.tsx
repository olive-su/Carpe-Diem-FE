import React from 'react';
import styled from 'styled-components';

import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer(props: any | undefined) {
    const themeColor = props.dark ? '#333' : '#fff';

    const StyleFooter = styled.div`
        z-index: 4;
        display: flex;
        cursor: pointer;
        position: fixed;
        bottom: 40px;
        right: 80px;
        z-index: 3;
    `;

    const ScrollTopIcon = styled.a`
        padding-left: 0.5em;
        text-decoration: none;
        color: ${themeColor};
        font-size: 2em;

        &:hover {
            text-decoration: none;
            color: #6666cc;
        }
    `;

    return (
        <>
            <StyleFooter>
                <ScrollTopIcon
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    <ArrowCircleUpRoundedIcon fontSize="large" />
                </ScrollTopIcon>
            </StyleFooter>
        </>
    );
}
