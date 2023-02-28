import React, { useState } from 'react';
import styled from 'styled-components';
import './main.css';
import { BiMoon, BiSun, BiMenu, BiExit } from 'react-icons/bi';
import { FaGithub } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import config from '../../config';

const Btns = styled.div`
    .btns span {
        color: var(--black);
    }
`;

function VideoPlayer(props: any) {
    const [isPlaying, setIsPlaying] = useState(false);

    function handlePlay() {
        setIsPlaying(true);
    }

    function handleStop() {
        setIsPlaying(false);
    }

    return (
        <div>
            <button className={`btn ${props.class} ${isPlaying ? 'active' : ''}`} onClick={handlePlay}>
                <div className={props.iconClass}></div>
                <p>{props.label}</p>
            </button>
            {isPlaying && (
                <div className={`clip ${props.class} ${isPlaying ? 'active' : ''}`}>
                    <video src={props.videoSrc} autoPlay controls></video>
                    <b className={`close ${props.class}`} onClick={handleStop}>
                        Close
                    </b>
                </div>
            )}
        </div>
    );
}

function VideoPlayer2(props: any) {
    const [isPlaying, setIsPlaying] = useState(false);

    function handlePlay() {
        setIsPlaying(true);
    }

    function handleStop() {
        setIsPlaying(false);
    }

    return (
        <div>
            <button className={`btn2 ${props.class} ${isPlaying ? 'active' : ''}`} onClick={handlePlay}>
                <div className={props.iconClass}></div>
                <p>{props.label}</p>
            </button>
            {isPlaying && (
                <div className={`clip2 ${props.class} ${isPlaying ? 'active' : ''}`}>
                    <video src={props.videoSrc} autoPlay controls></video>
                    <b className={`close2 ${props.class}`} onClick={handleStop}>
                        Close
                    </b>
                </div>
            )}
        </div>
    );
}

function Main() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCam, setIsCam] = useState(false);

    const handleDarkModeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCam = () => {
        setIsCam(!isCam);
    };

    return (
        <div className={`app ${isDarkMode ? 'dark' : ''}`}>
            <header>
                <a href="#" className="logo">
                    Logo
                </a>
                <Btns>
                    <div className="rightSide">
                        <div className="btns dayNight" onClick={handleDarkModeToggle}>
                            <span>{isDarkMode ? <BiSun size="30" name="sunny-outline" /> : <BiMoon size="30" name="moon-outline" />}</span>
                        </div>
                        <div className="btns menuToggle" onClick={handleMenuToggle}>
                            <span>{isMenuOpen ? <BiExit size="30" name="close-outline" /> : <BiMenu size="30" name="menu-outline" />}</span>
                        </div>
                    </div>
                </Btns>
            </header>

            <section className="main">
                <span className="realMain">
                    <video src="https://carpe-diem-contents.s3.ap-northeast-2.amazonaws.com/video.mp4" autoPlay loop muted />
                    <img src="./mask.jpg" className="mask" alt="" />
                    <h2>CarpeDiem</h2>
                </span>
            </section>

            <section className="login">
                <NavLink to={`http://${config.server.host}:${config.server.port}/auth/google`}>
                    <img src="./btn-google-signin-light-normal-web@2x.png" style={{ width: '300px' }} />
                </NavLink>
            </section>

            <section className="cam">
                <VideoPlayer class="mobile" iconClass="mobile" label="Mobile Cam" videoSrc="video.mp4" onClick={handleCam} />
                <VideoPlayer2 className="webCam" class="web" iconClass="web" label="Web Cam" videoSrc="video.mp4" onClick={handleCam} />
            </section>

            <ul className="sci">
                <li>
                    <a href="#">
                        <FaGithub size="30" />
                    </a>
                </li>
            </ul>

            <ul className={`navigation ${isMenuOpen ? 'active' : ''}`}>
                <li>
                    <a href="#">Mobile Cam</a>
                    <a href="#">Web Cam</a>
                </li>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">Album</a>
                </li>
                <li>
                    <a href="#">Video</a>
                </li>
                <li>
                    <a href="#">Friend Album</a>
                </li>
                <li>
                    <a href="#">My page</a>
                </li>
            </ul>
        </div>
    );
}

export default Main;
