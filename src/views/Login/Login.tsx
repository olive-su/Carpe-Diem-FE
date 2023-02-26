import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useIntersectionObsever from '../../hooks/useIntersectionObsever';
import config from '../../config';

const LoginStyle = styled.div`
    width: 100wh;
    height: 90vh;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-family: 'IBMPlexSansKR-Regular';
    padding-top: 200px;

    &.animation {
        animation-name: opacity;
        animation-duration: 5000ms;

        @keyframes opacity {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    }
`;

export default function Login() {
    const ref = useRef<HTMLDivElement>(null);
    const isInViewport = useIntersectionObsever(ref);

    return (
        <>
            <LoginStyle ref={ref} className={isInViewport ? 'animation' : ''}>
                <div>
                    <img src="./imgs/login-page.png" style={{ width: '120vh' }} />
                </div>
                <NavLink to={`http://${config.server.host}:${config.server.port}/auth/google`}>
                    <img src="./imgs/btn-google-signin-light-normal-web@2x.png" style={{ width: '15vw' }} />
                </NavLink>
            </LoginStyle>
        </>
    );
}
