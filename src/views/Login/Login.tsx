import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useIntersectionObsever from '../../hooks/useIntersectionObsever';
import config from '../../config';

const LoginStyle = styled.div`
    width: 100wh;
    height: 90vh;
    display: flex;
    font-family: 'IBMPlexSansKR-Regular';
    padding-top: 650px;
    padding-right: 30px;
    position: relative;
    z-index: 3;
`;

export default function Login() {
    const ref = useRef<HTMLDivElement>(null);
    const isInViewport = useIntersectionObsever(ref);

    return (
        <>
            <LoginStyle ref={ref}>
                <NavLink to={`http://${config.server.host}:${config.server.port}/auth/google`}>
                    <img src="./imgs/btn-google-signin-light-normal-web@2x.png" style={{ width: '15vw' }} />
                </NavLink>
            </LoginStyle>
        </>
    );
}
