import React, { useState } from 'react';
import styled from 'styled-components';
import { Navigation } from 'react-minimal-side-navigation';
import { Icon } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import '../../styles/List.css';
import { OpacityRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';

const Profile = styled.img`
    display: flex;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    margin-top: 10px;
`;
const Area = styled.div`
    width: 200px;
    height: auto;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    background-color: #e2e8f0;

    align-items: center;
`;

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <>
            <Area>
                <Profile src="./imgs/not_found_files.jpg"></Profile>
                <Typography variant="h6" pb={6} pt={2}>
                    test
                </Typography>
                <Navigation
                    activeItemId="/management/members"
                    onSelect={({ itemId }) => {
                        navigate(itemId);
                    }}
                    items={[
                        {
                            title: '회원정보 수정',
                            itemId: '/edit',
                            elemBefore: () => <Icon name="record" style={{ fontSize: '1.2rem' }} />,
                        },

                        {
                            title: '친구 목록',
                            itemId: '/friend',
                            elemBefore: () => <Icon name="book" />,
                        },

                        {
                            title: '탈퇴하기',
                            itemId: '/quit',
                            elemBefore: () => <Icon name="video play" />,
                        },
                    ]}
                />
            </Area>
        </>
    );
}
