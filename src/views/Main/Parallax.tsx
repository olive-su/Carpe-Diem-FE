import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Login from '../Login/Login';

import './parallax.css';

export default function Parallax() {
    return (
        <>
            <header className="et-header"></header>
            <div className="carpe">
                <span className="c1 span">C</span>
                <span className="c2 span">A</span>
                <span className="c3 span">R</span>
                <span className="c4 span">P</span>
                <span className="c5 span">E</span>
                <span className="c6 span">D</span>
                <span className="c7 span">I</span>
                <span className="c8 span">E</span>
                <span className="c9 span">M</span>
                <span className="c10 span"></span>
                <div className="bg"></div>
            </div>
            <span style={{ marginTop: '900vw' }}>
                <Box>
                    <Grow>
                        <Login />
                    </Grow>
                </Box>
            </span>
        </>
    );
}
