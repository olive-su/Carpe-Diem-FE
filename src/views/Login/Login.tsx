import React from 'react';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const LoginStyle = styled.div`
    width: 100wh;
    height: 100vh;
    text-align: center;
    font-family: 'IBMPlexSansKR-Regular';
`;

const Left = styled.div`
    width: 50%;
    height: 100vh;
    float: left;
    padding-top: 210px;
    background-color: #0284c7;
`;

const Right = styled.div`
    width: 50%;
    height: 100vh;
    padding-top: 130px;
    float: right;
`;

export default function Login() {
    return (
        <>
            <LoginStyle>
                <Left>
                    <h1 style={{ fontSize: '50px', color: 'white', marginBottom: '40px' }}>Contact Us</h1>
                    <div style={{ textAlign: 'left', marginLeft: '200px', marginBottom: '20px' }}>
                        <div style={{ marginTop: '20px' }}>
                            <LocationOnIcon fontSize="large" sx={{ color: 'white' }} />
                            <span style={{ color: 'white', fontSize: '20px' }}>Avenue on carpediem Siheung</span>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <EmailIcon fontSize="large" sx={{ color: 'white' }} />
                            <span style={{ color: 'white', fontSize: '20px' }}> Carpediem@gmail.com</span>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <PhoneIcon fontSize="large" sx={{ color: 'white' }} />
                            <span style={{ color: 'white', fontSize: '20px' }}>+0100000000</span>
                        </div>
                    </div>
                </Left>
                <Right>
                    <img src="./logo512.png" style={{ width: '200px' }} />
                    <h1>Welcome to CARPE DIEM</h1>
                    <h3 style={{ margin: '40px', color: '#71717a' }}>Great to see you again</h3>
                    <button
                        style={{
                            // flexWrap: 'wrap',
                            outline: 'none',
                            borderRadius: '1px',
                            border: '1.5px solid #0284c7',
                            boxShadow: '3px 3px 1px gray',
                            backgroundColor: '#0284c7',
                            color: 'white',
                            width: '90vw',
                            maxWidth: '400px',
                            height: '50px',
                            fontSize: '16px',
                            lineHeight: '16px',
                        }}
                    >
                        Google Login
                    </button>
                </Right>
            </LoginStyle>
        </>
    );
}
