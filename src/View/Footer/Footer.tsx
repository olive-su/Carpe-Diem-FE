import React from 'react'
import styled from 'styled-components';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';


const StyleFooter = styled.div`
    font-size: 15px;
    background-color: #fff;
    height: 200px;
    font-family: Pretendard-Regular;
    margin-top:-16px;
    text-align: center;

`;

export default function Footer() {
  return (
    <>
      <StyleFooter>
        <br />
        <span style={{ marginBottom: '20px', fontSize: '20px' }}>
          KDS | KSK | LJY | JSW | HSH
        </span>
        <div>
          <br />
          <Button>
            <GitHubIcon fontSize="large" sx={{ color: '#797395' }} />
          </Button>
          <Button>
            <YouTubeIcon fontSize="large" sx={{ color: 'red' }} />
          </Button>

        </div>
        <br />
        <div>Team CARPE DIEM | Privacy Policy</div>
        <div>@Copyright 2023. All Right Reserved.</div>
      </StyleFooter>
    </>
  )
}
