/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Headers.css';
import styled from 'styled-components';
// import HeaderNav from './HeaderNav';
import logotitle from './images/logotitle.png';

// 헤더
const StyleHeader = styled.div`
    font-size: 20px;
    color: black;
    background-color: #fff;
    height: 100px;
    font-family: IBMPlexSansKR-Regular;
    display: flex;
`;

// 1. navcontainer
const NavContainer = styled.div`
    display: block;
    justify-content: space-between;
    height: 50px;
    flex-grow: 1;
`;

// 2. logo
const Logo = styled.img`
    max-width: 100%;
    height: 90px;
    margin-top: 15px;
    text-align: center;
`;

// 3. nav-menu
const NavMenu = styled.div`
    display: block;
    justify-content: right;
    z-index: 9997;
`;

// 4.nav-item
const NavItem = styled.div`
    color: #7db2b1;
    text-decoration: none;
    text-align: right;
    padding: 0 1rem;
    cursor: pointer;
    align-items: bottom;
    float: right;
    z-index: 9997;
`;

export default function Header() {
    const [menuToggle, setMenuToggle] = useState<boolean>(false);
    return (
        <nav className="navigation__wrapper">
            <StyleHeader>
                <NavContainer>
                    <Link to="/">
                        <Logo src={logotitle} />
                    </Link>
                </NavContainer>

                <div className={!menuToggle ? 'burger__menu' : 'x__menu'} onClick={() => (menuToggle ? setMenuToggle(false) : setMenuToggle(true))}>
                    <div className="burger_line1"></div>
                    <div className="burger_line2"></div>
                    <div className="burger_line3"></div>
                </div>
                <div className={['menu__box', !menuToggle ? 'menu__box__hidden' : 'menu__box__visible'].join(' ')}>
                    <NavMenu>
                        <div className="menu__list">
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
                        </div>
                    </NavMenu>
                </div>
            </StyleHeader>
        </nav>
    );
}
