import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logotitle from './images/logotitle.png';
import Modal from './Modal';


// 헤더
const StyleHeader = styled.div`
    font-size: 20px;
    color:black;
    background-color:#cbd5e1;
    height: 170px;
    text-align:center;
    font-family:GangwonEduPowerExtraBoldA;
`;

// 1. navcontainer
const NavContainer = styled.div`
    display:block;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
`;

// 2. logo 
const Logo = styled.img`
    width:400px;
    height:150px;
    margin:15px;
    justify-content:center;

`;

// 3. nav-menu
const NavMenu = styled.div`
    display:flex;
    justify-content:right;
    align-items:right;
    position: sticky;
`;

// 4. nav-list
const NavList = styled.div`
    height:80px;
`;

// 5.nav-item
const NavItem = styled(Link)`
    color:#fff;
    display:flex;
    align-items:center;
    text-decoration:none;
    padding: 0 1rem;
    height: 100%
    courson: pointer;
    &.active {
        border-bottom: 3px solid #01bf71;
    }
`;



export default function Header() {
    return (
        <StyleHeader>
            <NavContainer>
                <Logo src={logotitle} />
            </NavContainer>
            <NavMenu>
                <NavList>
                    <NavItem to="/">My Page</NavItem>
                </NavList>
                <NavList>
                    <NavItem to="/">LOGOUT</NavItem>
                </NavList>
                <NavList>
                    <Modal />
                </NavList>
            </NavMenu>
        </StyleHeader>
    )
}



`
<StyleHeader>
        <NavbarContainer>
          <NavLogo to="/">
              LOGO
          </NavLogo>
          
          <NavMenu>
              <NavItem>
                  <NavLinks to="about">About</NavLinks>
              </NavItem>
              <NavItem>
                  <NavLinks to="about">About</NavLinks>
              </NavItem>
              <NavItem>
                  <NavLinks to="about">About</NavLinks>
              </NavItem>
          </NavMenu>
        </NavbarContainer>
</StyleHeader>
`