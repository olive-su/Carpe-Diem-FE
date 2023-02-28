import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

const StyleFooter = styled.div`
    /* font-size: 15px;
    background-color: #fff;
    height: 200px;
    font-family: Pretendard-Regular;
    margin-top: -25px;
    text-align: center;
    margin-bottom: 30px; */
    position: absolute;
    right: 100px;
    bottom: 40px;
    z-index: 4;
    display: flex;
`;
const Icon = styled.a`
    text-decoration: none;
    color: var(--black);
    font-size: 2em;
`;

export default function Footer() {
    return (
        <>
            {/* <StyleFooter>
                <br />
                <div>
                    <br />
                    <Button>
                        <GitHubIcon fontSize="large" sx={{ color: '#797395' }} />
                    </Button>
                    <Button>
                        <YouTubeIcon fontSize="large" sx={{ color: 'red' }} />
                    </Button>
                </div>
                <div style={{ marginTop: 10 }}>
                    <a href="https://github.com/sol2588" target="_blank" rel="noopener noreferrer">
                        🐱 KDS
                    </a>{' '}
                    |
                    <a href="https://github.com/olive-su" target="_blank" rel="noopener noreferrer">
                        👑 KSG
                    </a>{' '}
                    |
                    <a href="https://github.com/ljy6712" target="_blank" rel="noopener noreferrer">
                        👶🏻 LJY
                    </a>{' '}
                    |
                    <a href="https://github.com/nickhealthy" target="_blank" rel="noopener noreferrer">
                        🧐 JSW
                    </a>{' '}
                    |
                    <a href="https://github.com/XxoSio" target="_blank" rel="noopener noreferrer">
                        {' '}
                        ⚡️ HSH
                    </a>
                </div>

                <br />
                <div>Team CARPE DIEM | Privacy Policy</div>
                <div>@Copyright 2023. All Right Reserved.</div>
            </StyleFooter> */}
            <StyleFooter>
                <Icon href="https://github.com/cd-carpe-diem" rel="noreferrer noopener" target="_blank">
                    <FaGithub size="30" />
                </Icon>
            </StyleFooter>
        </>
    );
}
