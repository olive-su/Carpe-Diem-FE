import React from 'react';
import styled from 'styled-components';
import logotitle from './images/logotitle.png';
// import MyModal from './MyModal';
import { Link } from 'react-router-dom';

// 헤더
const StyleHeader = styled.div`
    font-size: 20px;
    color: black;
    background-color: #fff;
    height: 100px;
    font-family: IBMPlexSansKR-Regular;
`;

// 1. navcontainer
const NavContainer = styled.div`
    display: block;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
`;

// 2. logo
const Logo = styled.img`
    max-width: 100%;
    height: 90px;
    margin-top: 15px;
    /* transform: translate(30%, -10%);  */
    text-align: center;
`;

// 3. nav-menu
const NavMenu = styled.div`
    display: flex;
    justify-content: right;
`;

// 4.nav-item
const NavItem = styled.div`
    color: #7db2b1;
    text-decoration: none;
    padding: 0 1rem;
    cursor: pointer;
`;

export default function Header() {
    return (
        <StyleHeader>
            <div>
                <Link to="/">
                    <NavContainer>
                        <Logo src={logotitle} />
                    </NavContainer>
                </Link>
            </div>
            <NavMenu>
                <NavItem
                    onMouseOver={({ target }: { target: any }) => (target.style.color = '#0f382f')}
                    onMouseOut={({ target }: { target: any }) => (target.style.color = '#7DB2B1')}
                >
                    My Page
                </NavItem>
                <NavItem
                    onMouseOver={({ target }: { target: any }) => (target.style.color = '#0f382f')}
                    onMouseOut={({ target }: { target: any }) => (target.style.color = '#7DB2B1')}
                >
                    Logout
                </NavItem>
                {/* <MyModal /> */}
            </NavMenu>
        </StyleHeader>
    );
}
